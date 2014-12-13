CppRandomNames =
{
    one: ["foo","bar","baz","fiddle","faddle","bim","bam","quux","snork","snap"],
    two: ["squish","squash","smoot","spiffle","splin","squal","spork","smop","smick","smock"],
    three: ["blarp","squeeble","blurgle","podiddle","tulopulop","porskidor","swamwam"],
    four: ["MOOP","Moop","mooP","MooP","mOOp","moop","minx","mox","mole","moof","moog"]
};
RandomReturnTypes = ["int", "float", "double", "string"];

function cppGetRandomId(randomStream, num)
{getRandomId
    var id;

    switch(num){
        case 0:
            id = CppRandomNames.one[randomStream.nextIntRange(CppRandomNames.one.length)];
            break;
        case 1:
            id = CppRandomNames.two[randomStream.nextIntRange(CppRandomNames.two.length)];
            break;
        case 2:
            id = CppRandomNames.three[randomStream.nextIntRange(CppRandomNames.three.length)];
            break;
        case 3:
            id = CppRandomNames.four[randomStream.nextIntRange(CppRandomNames.four.length)];
            break;
        default:
            break;
    }

    return id;
}

function getRandomReturnType(randomStream)
{
    return RandomReturnTypes[randomStream.nextIntRange(4)];
}

function cppFunctionParametersA(randomStream)
{
    var parameterPassTypes =
        [
            ["pass by value", "", 0],
            ["pass by reference", "&", -1],
            ["passing a pointer", "*", -1],
            ["passing an array", "[]", 1]
        ];

    var retType = getRandomReturnType(randomStream);
    var funcName = cppGetRandomId(randomStream, randomStream.nextIntRange(3));
    var paramType = getRandomReturnType(randomStream);
    var paramName = cppGetRandomId(randomStream, 3);

    this.answerChoices = [
        { value: parameterPassTypes[0][0], specialChar: parameterPassTypes[0][1],
            specialPos: parameterPassTypes[0][2], flag: false},
        { value: parameterPassTypes[1][0], specialChar: parameterPassTypes[1][1],
            specialPos: parameterPassTypes[1][2], flag: false},
        { value: parameterPassTypes[2][0], specialChar: parameterPassTypes[2][1],
            specialPos: parameterPassTypes[2][2], flag: false},
        { value: parameterPassTypes[3][0], specialChar: parameterPassTypes[3][1],
            specialPos: parameterPassTypes[3][2], flag: false}
    ];

    randomStream.shuffle(this.answerChoices);

    this.correctIndex = randomStream.nextIntRange(4);
    this.answerChoices[this.correctIndex][3] = true;

    this.formatQuestion = function(format) {
        switch (format) {
            case "HTML": return this.formatQuestionHTML();
        }
        return "unknown format";
    };

    this.formatQuestionHTML = function () {
        var questionText = "<p>The following prototype is an example of which type of parameter passing?</p>" +
            "<pre>" + retType + " " + funcName + "(" + paramType + " ";
        if(this.answerChoices[this.correctIndex].specialPos == -1)
            questionText += this.answerChoices[this.correctIndex].specialChar;
        questionText += paramName;
        if(this.answerChoices[this.correctIndex].specialPos == 1)
            questionText += this.answerChoices[this.correctIndex].specialChar;
        questionText += ");</pre>";

        questionText += "<p><strong>a) </strong>"
            + this.answerChoices[0].value + "<br><strong>b) </strong>"
            + this.answerChoices[1].value + "<br><strong>c) </strong>"
            + this.answerChoices[2].value + "<br><strong>d) </strong>"
            + this.answerChoices[3].value + "</p>";

        return questionText;
    };

    this.formatAnswer = function(format) {
        switch (format) {
            case "HTML": return this.formatAnswerHTML();
        }
        return "unknown format";
    };

    this.formatAnswerHTML = function () {
        return String.fromCharCode(this.correctIndex+97); //0 = 'a', 1 = 'b', 2 = 'c', etc...
    };

}

function cppFunctionParametersB(randomStream)
{
    ///// Generate randomness of the question
    var calledFunName = cppGetRandomId(randomStream, randomStream.nextIntRange(3));
    var calledFunParameterName = cppGetRandomId(randomStream, 3);

    var mainVarName = calledFunParameterName;
    while(mainVarName == calledFunParameterName)
        mainVarName = cppGetRandomId(randomStream, 3);
    var mainVarInitialValue = 2 + randomStream.nextIntRange(97);
    var mainVarFinalValue = mainVarInitialValue;

    var program = "";   // initialize program
    program += "#include &lt;iostream>\n\n";

    ///// Write the called funtion
    program += "int " + calledFunName + "(int " + calledFunParameterName + ")\n{\n";

    program += "  return " + calledFunParameterName + ";\n}\n\n";

    ///// Write the main function
    program += "int main()\n{\n";
    program += "  int " + mainVarName + " = " + mainVarInitialValue + ";\n\n";



    program += "  std::cout << " + mainVarName + " << std::endl;\n\n";
    program += "  return 0;\n}";

    this.answerChoices = [
        { value: mainVarFinalValue, flag: true},
        { value: mainVarFinalValue + 1, flag: false},
        { value: mainVarFinalValue + 2, flag: false},
        { value: mainVarFinalValue + 3, flag: false}
    ];

    randomStream.shuffle(this.answerChoices);

    this.formatQuestion = function(format) {
        switch (format) {
            case "HTML": return this.formatQuestionHTML();
        }
        return "unknown format";
    };

    this.formatQuestionHTML = function () {
        var questionText = "<p>What is the output of the following program?</p>" +
            "<pre>" + program + "</pre>";

        questionText += "<p><strong>a) </strong>"
            + this.answerChoices[0].value + "<br><strong>b) </strong>"
            + this.answerChoices[1].value + "<br><strong>c) </strong>"
            + this.answerChoices[2].value + "<br><strong>d) </strong>"
            + this.answerChoices[3].value + "</p>";

        return questionText;
    };

    this.formatAnswer = function(format) {
        switch (format) {
            case "HTML": return this.formatAnswerHTML();
        }
        return "unknown format";
    };

    this.formatAnswerHTML = function () {
        return String.fromCharCode(this.correctIndex+97); //0 = 'a', 1 = 'b', 2 = 'c', etc...
    };

}

function cppFunctionParametersQuestion(randomStream)
{
    if(randomStream.nextIntRange(3) === 0)
        return new cppFunctionParametersA(randomStream);
    else
        return new cppFunctionParametersB(randomStream);
}
