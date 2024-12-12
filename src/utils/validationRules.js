export const validationRules = {
  company: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 100,
      pattern: /^[a-zA-Z0-9\s\-\.]+$/
    },
    industry: {
      required: true,
      options: ['retail', 'hospitality', 'technology', 'healthcare', 'other']
    },
    size: {
      required: true,
      options: ['1-50', '51-200', '201-1000', '1000+']
    },
    target_audience: {
      required: true,
      minLength: 10,
      maxLength: 500
    }
  },
  goals: {
    primary_goal: {
      required: true,
      minLength: 10,
      maxLength: 200
    },
    secondary_goals: {
      required: false,
      maxLength: 500
    },
    budget_range: {
      required: true,
      pattern: /^\$?\d{1,3}(,?\d{3})*(\.\d{2})?$/
    },
    timeline: {
      required: true,
      options: ['1-3 months', '3-6 months', '6-12 months', '12+ months']
    }
  },
  rewards: {
    points_value: {
      required: true,
      pattern: /^\d+(\.\d{1,2})?$/,
      validate: (value) => parseFloat(value) > 0
    },
    tier_levels: {
      required: true,
      minCount: 1,
      maxCount: 5
    },
    reward_types: {
      required: true,
      minCount: 1
    }
  }
};