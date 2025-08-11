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

function gameEnd(win){
    perfectSound.play()
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
    }else if(pageStatus == 'gameplay'){
        gameEnd(1)
    }
}

function onKey2() {
    if(pageStatus == 'home' || pageStatus == 'waitingPlayer'){
        pageStart(2)
    }else if(pageStatus == 'playerReady'){
        goToCountdown()
    }else if(pageStatus == 'gameplay'){
        gameEnd(2)
    }
}

  // Helper: abaikan jika user sedang mengetik di field form
  function isTypingInField(el) {
    if (!el) return false;
    const tag = el.tagName ? el.tagName.toLowerCase() : '';
    const editable = $(el).attr('contenteditable') === 'true';
    return tag === 'input' || tag === 'textarea' || editable;
  }

  // Tangkap keydown sekali (hindari repeat)
  let pressed = new Set();

  $(document).on('keydown', function (e) {
    if (isTypingInField(document.activeElement)) return;

    // e.key akan '1' / '2'
    // e.code bisa 'Digit1' / 'Numpad1'
    const is1 = e.key === '1' || e.code === 'Digit1' || e.code === 'Numpad1';
    const is2 = e.key === '2' || e.code === 'Digit2' || e.code === 'Numpad2';

    if (is1 && !pressed.has('1')) {
      pressed.add('1');
      e.preventDefault();
      onKey1();
    }
    if (is2 && !pressed.has('2')) {
      pressed.add('2');
      e.preventDefault();
      onKey2();
    }
  });

  // Lepaskan status saat keyup supaya bisa dipicu lagi
  $(document).on('keyup', function (e) {
    if (['1', 'Digit1', 'Numpad1'].includes(e.key) || e.code === 'Digit1' || e.code === 'Numpad1') {
      pressed.delete('1');
    }
    if (['2', 'Digit2', 'Numpad2'].includes(e.key) || e.code === 'Digit2' || e.code === 'Numpad2') {
      pressed.delete('2');
    }
  });