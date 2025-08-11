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

let pageStatus = 'home', statusPlayer1 = false, statusPlayer2 = false

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
    });
  
    $(document).on('keyup', function(e){
      pressed.delete(e.code);
    });
  
    // init
    draw();