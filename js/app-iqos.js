// AUDIO
var bgsound = new Howl({
    src: ['./assets/audios/bgm.mp3'],
    loop: true,
    autoplay: true,
    volume: 0.6,
});
var wrongSound = new Howl({
    src: ['./assets/audios/wrong.mp3']
});
var perfectSound = new Howl({
    src: ['./assets/audios/add_point.mp3']
});
var btnSound = new Howl({
    src: ['./assets/audios/click.mp3']
});
var countSound = new Howl({
    src: ['./assets/audios/NEW-COUNTDOWN.mp3']
});
var hitSound = new Howl({
    src: ['./assets/audios/hit.mp3']
});
var transisiSound = new Howl({
    src: ['./assets/audios/NEW-TRANSITION.mp3']
});

let pageStatus = 'home', statusPlayer1 = false, statusPlayer2 = false, statusSetup = false

function pageStart(player){
    btnSound.play()
    document.getElementById('videoWaitingPlayer').play()
    pageStatus = 'waitingPlayer'
    $("#sectionHome").addClass("hide")
    $("#sectionWaitingPlayer").removeClass("hide")

    if(player == 1){
        $("#p1").removeClass('off')
        statusPlayer1 = true
    }

    if(player == 2){
        $("#p2").removeClass('off')
        statusPlayer2 = true
    }

    if(statusPlayer1 && statusPlayer2){
        pageStatus = 'playerReady'
        $("#playerStatus").html('Press the button <br> to start the game!')
    }
}

function goToCountdown(){
    btnSound.play()
    countSound.play()
    document.getElementById('videoCountdown').play()
    pageStatus = 'countdown'
    $("#sectionWaitingPlayer").addClass("hide")
    $("#sectionCountdown").removeClass("hide")

    $("#videoCountdown").on('ended', function() {
        goToGameplay()
    });
}
function goToGameplay(){
    btnSound.play()
    pageStatus = 'gameplay'
    $("#sectionCountdown").addClass("hide")
    $("#sectionGameplay").removeClass("hide")
    $(".circle").removeClass("off")
}
// DEBUG
// goToGameplay()

function gameEnd(win){
    perfectSound.play()
    transisiSound.play()
    finished = false
    reset()
    pageStatus = 'endGame'
    $(".circle").addClass("off")
    if(win == 1){
        $("#sectionGameplay").addClass("hide")
        $("#sectionP1Win").removeClass("hide")
        document.getElementById('videoP1Win').play()
        $("#videoP1Win").on('ended', function() {
            backToHome()
        });
    }else{
        $("#sectionGameplay").addClass("hide")
        $("#sectionP2Win").removeClass("hide")
        document.getElementById('videoP2Win').play()
        $("#videoP2Win").on('ended', function() {
            backToHome()
        });
    }
}

function backToHome(){
    btnSound.play()
    document.getElementById('videoFront').play()
    pageStatus = 'home', statusPlayer1 = false, statusPlayer2 = false
    $("#p1").addClass('off')
    $("#p2").addClass('off')
    $("#playerStatus").html('Waiting Others Team')
    $("#sectionHome").removeClass("hide")
    $("#sectionP1Win").addClass("hide")
    $("#sectionP2Win").addClass("hide")
}

// TODO: ganti dengan aksi kamu
function onKey1() {
    if(pageStatus == 'home' || pageStatus == 'waitingPlayer'){
        pageStart(1)
    }else if(pageStatus == 'playerReady'){
        goToCountdown()
    }
}

function onKey2() {
    if(pageStatus == 'home' || pageStatus == 'waitingPlayer'){
        pageStart(2)
    }else if(pageStatus == 'playerReady'){
        goToCountdown()
    }
}

  // Helper: abaikan jika user sedang mengetik di field form
//   function isTypingInField(el) {
//     if (!el) return false;
//     const tag = el.tagName ? el.tagName.toLowerCase() : '';
//     const editable = $(el).attr('contenteditable') === 'true';
//     return tag === 'input' || tag === 'textarea' || editable;
//   }

//   // Tangkap keydown sekali (hindari repeat)
//   let pressed = new Set();

//   $(document).on('keydown', function (e) {
//     if (isTypingInField(document.activeElement)) return;

//     // e.key akan '1' / '2'
//     // e.code bisa 'Digit1' / 'Numpad1'
//     const is1 = e.key === '1' || e.code === 'Digit1' || e.code === 'Numpad1';
//     const is2 = e.key === '2' || e.code === 'Digit2' || e.code === 'Numpad2';

//     if (is1 && !pressed.has('1')) {
//       pressed.add('1');
//       e.preventDefault();
//       onKey1();
//     }
//     if (is2 && !pressed.has('2')) {
//       pressed.add('2');
//       e.preventDefault();
//       onKey2();
//     }
//   });

//   // Lepaskan status saat keyup supaya bisa dipicu lagi
//   $(document).on('keyup', function (e) {
//     if (['1', 'Digit1', 'Numpad1'].includes(e.key) || e.code === 'Digit1' || e.code === 'Numpad1') {
//       pressed.delete('1');
//     }
//     if (['2', 'Digit2', 'Numpad2'].includes(e.key) || e.code === 'Digit2' || e.code === 'Numpad2') {
//       pressed.delete('2');
//     }
//   });


// =====================================================
    // Geometry
    const cx = 300, cy = 300, r = 153;
    const rOuter = 240;
    const step = 6; // derajat per tekan
    // Start di bawah (180°)
    let greenAngle  = 180; // bergerak ke 0 (CCW)
    let purpleAngle = 180; // bergerak ke 360 (CW)
    let finished = false;
  
    const $gArc = $("#greenArc");
    const $pArc = $("#purpleArc");
    const $gOrb = $("#greenOrb");
    const $pOrb = $("#purpleOrb");
  
    function toRad(d){ return d * Math.PI/180; }
    function polar(angleDeg, radius = r) {
        const a = toRad(angleDeg);
        return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
    }
  
    // SVG arc path dari angle A ke B, arah CW/CCW
    function arcPath(fromDeg, toDeg, sweepCW){
      // clamp
      if (sweepCW) { if (toDeg < fromDeg) toDeg = fromDeg; }
      else { if (toDeg > fromDeg) toDeg = fromDeg; }
  
      const start = polar(fromDeg);
      const end   = polar(toDeg);
      const delta = Math.abs(toDeg - fromDeg);
      const large = (delta > 180) ? 1 : 0;
      const sweep = sweepCW ? 1 : 0;
      return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 ${large} ${sweep} ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
    }
  
    function placeOrb($el, angle, radius = r) {
        const p = polar(angle, radius);
        $el.attr({ cx: p.x, cy: p.y });
    }
    function placeOrbImage($el, angle, radius, size) {
        const p = polar(angle, radius);
        $el.attr({
          x: p.x - size/2,
          y: p.y - size/2
        });
    }
  
    function draw(){
      // green: dari 180 -> greenAngle (CCW)
      $gArc.attr('d', arcPath(180, greenAngle, /*CW?*/ false));
      // purple: dari 180 -> purpleAngle (CW)
      $pArc.attr('d', arcPath(180, purpleAngle, /*CW?*/ true));
  
    //   placeOrb($pOrb, greenAngle, rOuter);
    //   placeOrb($gOrb, purpleAngle, rOuter);
      
      placeOrbImage($pOrb, greenAngle, rOuter, 80);
      placeOrbImage($gOrb, purpleAngle, rOuter, 80);

    }
  
    function checkWin(){
        if (finished) return;
        if (greenAngle <= 0 && purpleAngle >= 360){
          finished = true;
          setStatus('🤝 Draw! Kalian bertemu di puncak');
        } else if (greenAngle <= 0){
          finished = true;
          console.log("PURPLE MENANG")
          gameEnd(2)
        } else if (purpleAngle >= 360){
          finished = true;
          console.log("GREEN MENANG")
          gameEnd(1)
        }
    }
  
    function reset(){
      greenAngle = 180;
      purpleAngle = 180;
      finished = false;
      draw();
    }
  
    // --- Controls ---
    // hindari repeat saat key ditahan
    let pressed = new Set();
  
    $(document).on('keydown', function(e){
      if (pressed.has(e.code)) return;
      pressed.add(e.code);
  
      if (finished && e.key === 'Enter'){ reset(); return; }
  
      if (finished) return;
  
      if (e.key === '2' || e.code === 'Digit1' || e.code === 'Numpad1'){
        if(pageStatus == 'gameplay'){
            hitSound.play()
            greenAngle -= step;
            if (greenAngle <= 0) greenAngle = 0; // clamp
            draw();
            checkWin();
            e.preventDefault();
        }else{
            onKey2();
        }
      }
      
      if (e.key === '1' || e.code === 'Digit2' || e.code === 'Numpad2'){
        if(pageStatus == 'gameplay'){
            hitSound.play()
            purpleAngle += step;
            if (purpleAngle >= 360) purpleAngle = 360; // clamp
            draw();
            checkWin();
            e.preventDefault();
        }else{
            onKey1();
        }
      }
      if (e.key === 'Enter'){
        reset();
      }
      if (e.key === 's'){
        if(!statusSetup){
            statusSetup = true
            $("#sectionSetup").removeClass('hide')
        }else{
            statusSetup = false
            $("#sectionSetup").addClass('hide')
        }
      }
      if (e.key === 'r'){
        location.reload()
      }
    });
  
    $(document).on('keyup', function(e){
      pressed.delete(e.code);
    });
  
    // init
    draw();



    // ====== STATUS SLIDES (3 TEKS LOOPING) ======
    const $status = $("#statusText");
const statusSlides = [
    'KEEP YOUR<br> CURIOSITY LEVEL<br>HIGH!',
    'EVERY BURST<br>REVEALS MORE',
    'STAY CURIOUS,<br/>STAY AHEAD'
  ];
  
  let slideIdx = 0;
  let slideTimer = null;
  
  // pakai ini untuk set teks satu kali (tanpa ganggu loop)
  function setStatus(msg){
    $status.stop(true, true).html(msg).show();
  }
  
  // jalankan loop teks
  function startStatusLoop() {
    stopStatusLoop(); // clear dulu
  
    const cycle = () => {
      if (finished) return; // otomatis berhenti kalau game selesai
      slideIdx = (slideIdx) % statusSlides.length;
      const nextHtml = statusSlides[slideIdx];
  
      // fade out -> ganti text -> fade in -> tunggu -> lanjut
      $status.fadeOut(220, function(){
        $status.html(nextHtml).fadeIn(220, function(){
          slideIdx++;
          slideTimer = setTimeout(cycle, 2400); // jeda antar slide
        });
      });
    };
  
    // mulai langsung
    cycle();
  }
  startStatusLoop();
  
  function stopStatusLoop(){
    if (slideTimer){ clearTimeout(slideTimer); slideTimer = null; }
    $status.stop(true, true); // hentikan animasi yang tertunda
  }

// INTEGRASI ARDUINO
let port;
let reader;
let keepReading = false;

const connectButton = document.getElementById('connectButton');
const statusDiv = document.getElementById('status');
const buttonStatusDiv = document.getElementById('buttonStatus');

// Attempt to auto-connect to previously authorized port
async function tryAutoConnect() {
    try {
        const ports = await navigator.serial.getPorts();
        if (ports.length > 0) {
            port = ports[0]; // Use the first authorized port
            await port.open({ baudRate: 9600 });
            statusDiv.textContent = 'Auto-Connected to Arduino';
            connectButton.textContent = 'Disconnect';
            keepReading = true;
            readSerialData();
        } else {
            statusDiv.textContent = 'No authorized ports found. Click Connect to select.';
        }
    } catch (error) {
    statusDiv.textContent = `Auto-Connect Error: ${error.message}. Click Connect.`;
    }
}

// Handle manual connect/disconnect
connectButton.addEventListener('click', async () => {
    if (!port) {
        try {
            port = await navigator.serial.requestPort({});
            await port.open({ baudRate: 9600 });
            statusDiv.textContent = 'Connected to Arduino';
            connectButton.textContent = 'Disconnect';
            keepReading = true;
            readSerialData();
        } catch (error) {
            statusDiv.textContent = `Error: ${error.message}`;
        }
    } else {
        keepReading = false;
        if (reader) {
            await reader.cancel();
            reader = null;
        }
        await port.close();
        port = null;
        statusDiv.textContent = 'Disconnected';
        connectButton.textContent = 'Connect to Arduino';
        buttonStatusDiv.textContent = 'Waiting for button data...';
    }
});

// Read serial data
async function readSerialData() {
    while (port.readable && keepReading) {
    reader = port.readable.getReader();
    try {
        while (true) {
        const { value, done } = await reader.read();
        if (done) {
            break;
        }
        const text = new TextDecoder().decode(value).trim();
        
        // Handle multiple button states that might arrive together
        const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        
        let button1Pressed = false;
        let button2Pressed = false;
        let statusMessage = '';
        
        // Process each line of data
        lines.forEach(line => {
            if (line === 'BTN1') {
                button1Pressed = true;
            } else if (line === 'BTN2') {
                button2Pressed = true;
            } else if (line.includes('BTN1') && line.includes('BTN2')) {
                // Handle if Arduino sends combined data like "BTN1,BTN2" or "BTN1+BTN2"
                button1Pressed = true;
                button2Pressed = true;
            }
        });
        
        // Update status based on what buttons are pressed
        if (button1Pressed && button2Pressed) {
            statusMessage = 'Both Buttons Pressed!';
            buttonStatusDiv.style.backgroundColor = '#ff9800';
            buttonStatusDiv.style.color = 'white';

            // HANDLE PRESS GAME
            // if(pageStatus == 'gameplay'){
            //     hitSound.play()
            //     purpleAngle += step;
            //     if (purpleAngle >= 360) purpleAngle = 360; // clamp

            //     greenAngle -= step;
            //     if (greenAngle <= 0) greenAngle = 0; // clamp

            //     draw();
            //     checkWin();
            //     e.preventDefault();
            // }
        } else if (button1Pressed) {
            statusMessage = 'Button 1 Pressed';
            buttonStatusDiv.style.backgroundColor = '#4CAF50';
            buttonStatusDiv.style.color = 'white';
            console.log("BTN1 PRESSED")

            // HANDLE PRESS GAME
            if(pageStatus == 'gameplay'){
                hitSound.play()
                purpleAngle += step;
                if (purpleAngle >= 360) purpleAngle = 360; // clamp

                console.log("PRESS GREEN : "+purpleAngle)

                draw();
                checkWin();
                e.preventDefault();
            }else{
                onKey1();
            }

        } else if (button2Pressed) {
            statusMessage = 'Button 2 Pressed';
            buttonStatusDiv.style.backgroundColor = '#2196F3';
            buttonStatusDiv.style.color = 'white';
            console.log("BTN2 PRESSED")

            // HANDLE PRESS GAME
            if(pageStatus == 'gameplay'){
                hitSound.play()
                greenAngle -= step;
                if (greenAngle <= 0) greenAngle = 0; // clamp

                console.log("PRESS PURPLE : "+greenAngle)

                draw();
                checkWin();
                e.preventDefault();
            }else{
                onKey2();
            }
        }
        
        if (statusMessage) {
            buttonStatusDiv.textContent = statusMessage;
            
            // Reset status after 500ms to show when buttons are released
            setTimeout(() => {
                buttonStatusDiv.textContent = 'Waiting for button data...';
                buttonStatusDiv.style.backgroundColor = 'white';
                buttonStatusDiv.style.color = '#333';
            }, 500);
        }
        }
    } catch (error) {
        statusDiv.textContent = `Error reading data: ${error.message}`;
        keepReading = false;
        port = null;
        connectButton.textContent = 'Connect to Arduino';
    } finally {
        reader.releaseLock();
    }
    }
}

// Start auto-connect on page load
window.addEventListener('load', tryAutoConnect);