const generateProblemId = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `JH-PROB-${year}-${randomNum}`;
};

module.exports = generateProblemId;
