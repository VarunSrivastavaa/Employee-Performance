const axios = require('axios');
const Employee = require('../models/Employee');

exports.getRecommendation = async (req, res) => {
  try {
    const { employeeIds } = req.body; // Can be a single ID or an array of IDs
    
    if (!employeeIds || employeeIds.length === 0) {
      return res.status(400).json({ message: 'Employee IDs are required' });
    }

    const employees = await Employee.find({ _id: { $in: employeeIds } });
    
    if (!employees || employees.length === 0) {
      return res.status(404).json({ message: 'Employees not found' });
    }

    let prompt = "";
    if (employees.length === 1) {
      const emp = employees[0];
      prompt = `Analyze the following employee and provide a recommendation:
      Name: ${emp.name}
      Department: ${emp.department}
      Skills: ${emp.skills.join(', ')}
      Performance Score: ${emp.performanceScore}/100
      Experience: ${emp.experience} years.
      
      If the performance score is high (>=80), suggest promotion.
      If the performance score is low (<60), provide improvement feedback.
      If skills are limited for their department, recommend skill enhancement training.
      Provide a concise and professional response.`;
    } else {
      prompt = `Analyze the following employees and rank them based on performance and experience. Provide recommendations for promotions and areas of improvement:\n`;
      employees.forEach(emp => {
        prompt += `- ${emp.name} (${emp.department}): ${emp.performanceScore}/100 score, ${emp.experience} years exp, Skills: ${emp.skills.join(', ')}\n`;
      });
      prompt += `\nPlease provide a ranked list and brief reasoning.`;
    }

    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'meta-llama/llama-3-8b-instruct:free',
      messages: [{ role: 'user', content: prompt }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const aiRecommendation = response.data.choices[0].message.content;

    res.json({ recommendation: aiRecommendation });
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    res.status(500).json({ error: 'Failed to generate AI recommendation.' });
  }
};
