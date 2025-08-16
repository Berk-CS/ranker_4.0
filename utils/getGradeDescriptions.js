// utils/getLetterGrade.js

const getGradeDescription = (score) => {
    if (score >= 90) return 'Unicorn';
    if (score >= 85) return 'Top Tier';
    if (score >= 80) return 'Solid';
    if (score >= 75) return 'Average';
    if (score >= 70) return 'Below Average';
    return 'Dealbreaker';
  };
  
  export default getGradeDescription;
  