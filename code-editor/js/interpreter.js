var codeSrc = "RESET\n" + // Reset position and speed
              "VERBOSE TRUE\n" +
              "SPEED 50\n" + // Configure speed
              "EXEC INIT\n" + // Execute initialization callback
              "SPEED -40\n" + // Decrease speed
              "MOVE X +50, Y -50\n" +  // Move axes
              "MOVE X +50\n" + // Move an axe
              "EXEC CALLBACK\n" + // Execute custom callback
              "SPEED +50\n" + // Increase speed
              "MOVE X 0 Y 0\n" + // Move axes
              "EXEC TERM"; // Execute termination callback

var codeStates = {
  parameters: '',
  command: ''
};

function logPrint(str) {
  var logElement = document.getElementById('div_log');

  console.log(str);

  //logElement.innerHTML += str + "<br/>";
}

function canvasInit() {
  var canvas = document.getElementById("canvas_execution");

  var context = canvas.getContext("2d");

  console.log('parentElement: ' + JSON.stringify(canvas.parentElement.style));
  console.log('width: ' + canvas.parentElement.offsetWidth);
  console.log('height: ' + canvas.parentElement.offsetHeight);

  //canvas.width = window.innerWidth;
  //canvas.height = 500; //canvas.parentElement.offsetHeight;

  //canvas.style.width ='100%';
  //canvas.style.height = 3 * canvas.parentElement.offsetWidth / 4;

  context.beginPath();

  context.moveTo(0, 0);

  context.lineTo(100, 150);

  context.lineTo(200, 250);

  context.lineTo(400, 350);

  context.lineTo(490, 490);

  context.stroke();
}

function codeProcessChar(codeChar) {
  logPrint(codeChar);

  codeSmFeed(codeChar);
}

function codeProcessLine(str) {
  for (var i = 0; i < str.length; i++) {
    var codeChar = str.charAt(i);

    codeProcessChar(codeChar);
  }
}

function codeSmFeed(codeChar) {
  
}

function codeInterpret() {
  var regex = /\n/g;

  var str = codeSrc.replace(regex, "<br/>");

  // Interpret line by line

  var regex = /\n/;

  var codeLines = codeSrc.split(regex);

  console.log(codeLines.length);

  for (var i = 0; i < codeLines.length; i++) {
    logPrint('[LINE] ' + codeLines[i]);

    codeProcessLine(codeLines[i]);
  }
}

function executeCode() {
  console.log('executeCode()');

  canvasInit();

  codeInterpret();
}

function init() {
  setTimeout(function() {
    document.getElementById('code_src').innerHTML = codeSrc;

    executeCode();
  }, 100);
}