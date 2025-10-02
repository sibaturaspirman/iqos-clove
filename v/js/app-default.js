// AUDIO
var bgSound = new Howl({
  src: ['./assets/audios/bg.mp3'],
  autoplay: true,
  loop: true,
  volume: 0.2
});
var btnSound = new Howl({
  src: ['./assets/audios/tap.mp3']
});

document.addEventListener('contextmenu', event => event.preventDefault());


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let opsiJawaban = [
  {
    day: '1',
    data: [
      {
        q: 'Tanggal berapa Commercial Conference 2025 dimulai?',
        text: '14OKTOBER',
        text2: '2025'
      },
      {
        q: '2 Tanggal berapa Commercial Conference 2025 dimulai?',
        text: 'BERRYGOOD',
        text2: 'JOB'
      },
      {
        q: '3 Tanggal berapa Commercial Conference 2025 dimulai?',
        text: 'ONEIN',
        text2: 'AMELON'
      },
    ]
  },
  {
    day: '2',
    data: [
      {
        q: 'd2 Tanggal berapa Commercial Conference 2025 dimulai?',
        text: '14OKTOBER',
        text2: '2025'
      },
      {
        q: 'd2 2 Tanggal berapa Commercial Conference 2025 dimulai?',
        text: 'BERRYGOOD',
        text2: 'JOB'
      },
      {
        q: 'd2 3 Tanggal berapa Commercial Conference 2025 dimulai?',
        text: 'ONEIN',
        text2: 'AMELON'
      },
    ]
  },
]

let slotAnswer = [], slotAnswerBottom = [], slotAnswerAll = [], slotAnswerNumber = 0, slotAnswerNumberBottom = 0, slotAnswerNumberAll= 0, getNumber, pilihopsi, pilihopsiTOP, pilihopsiBOTTOM, splitCharTOP, splitCharTOP2, splitCharBOTTOM, splitCharBOTTOM2, latestAnswer, nyawa = 1, maxRandom = 2, setDay = 1;

var waktuBatasMainGame;
var waktuAkhirMainGame = 30;
var countdown = 0;

function setupTimer(){
  waktuAkhirMainGame += 5
  $("#setupTimer span").html(waktuAkhirMainGame)
}

function countDownTimer(){
  var countdownNumberEl = document.querySelector('#waktuMain');
  countdown = waktuAkhirMainGame;

  countdownNumberEl.textContent = countdown;
  waktuBatasMainGame = setInterval(function() {
      countdown = --countdown <= 0 ? 0 : countdown;
      countdownNumberEl.textContent = countdown;

      // console.log(countdown)
      if(countdown == 0){
          gameOver('lost')
      }
  }, 1000);
}

function countdownAwal(){
  setTimeout(() => {
    $("#pleaseWaitFront .block-image:nth-child(1)").css('opacity','0')
    $("#pleaseWaitFront .block-image:nth-child(2)").css('opacity','1')
    setTimeout(() => {
      $("#pleaseWaitFront .block-image:nth-child(2)").css('opacity','0')
      $("#pleaseWaitFront .block-image:nth-child(3)").css('opacity','1')
      setTimeout(() => {
        $("#pleaseWaitFront .block-image:nth-child(3)").css('opacity','0')
      }, 1000);
    }, 1000);
  }, 1000);
}

function startAwal(){
  $(".htp").removeClass('hideSomething')
}

function nextPageFront(){
  // if (localStorage.getItem("opsiJawabanStore") === null) {
  //   localStorage.setItem('opsiJawabanStore', JSON.stringify(opsiJawaban));
  //   localStorage.setItem('maxRandomStore', maxRandom);
  // }else{
  //   let lastJawabanStore = localStorage.getItem('opsiJawabanStore')
  //   opsiJawaban = JSON.parse(lastJawabanStore)
  //   console.log(opsiJawaban)

  //   let maxRandomStore = localStorage.getItem('maxRandomStore')
  //   maxRandom = parseInt(maxRandomStore)
  //   console.log(maxRandom)
  // }

  btnSound.play()
  $(".htp").addClass('hideSomething')
  $(".front .pleaseWait").show()
  $(".front .logo").hide()
  $("#pageFront").addClass('disable')
  countdownAwal()

  setTimeout(() => {
    $("#pageFront").removeClass('disable')
    // $(".front .pleaseWait").hide()
    // $(".front .logo").show()
    waktuBatasMainGame = clearInterval(waktuBatasMainGame);

    $("#debugTutup").hide()
    $("#debugBuka").hide()
    $("#setupTimer").hide()
    $("#debugKisi").show()

    $(".gameplay-top").removeClass("hide")

    getNumber = getRandomInt(0, maxRandom);
    // getNumber = 0;
    pilihopsi = opsiJawaban[setDay].data[getNumber];
    pilihopsiTOP = pilihopsi.text
    pilihopsiBOTTOM = pilihopsi.text2
    // console.log(pilihopsi)
    $("#question").html(pilihopsi.q)
    console.log(pilihopsiTOP)
    console.log(pilihopsiBOTTOM)
    splitCharTOP = pilihopsiTOP.split("");
    splitCharTOP.sort(() => 0.5 - Math.random());
    splitCharTOP2 = pilihopsiTOP.split("");
    splitCharBOTTOM = pilihopsiBOTTOM.split("");
    splitCharBOTTOM.sort(() => 0.5 - Math.random());
    splitCharBOTTOM2 = pilihopsiBOTTOM.split("");

    $("#jawabAtas").html(pilihopsiTOP)
    $("#jawabBawah").html(pilihopsiBOTTOM)

    $("#gamePlayOpsi").html('')
    // $("#gamePlayOpsiBottom").html('')
    $("#gamePlayAnswer").html('')
    $("#gamePlayAnswerBottom").html('')
    for(let i=0;i<splitCharTOP.length;i++){
      $("#gamePlayOpsi").append(`<div onclick="putCharAnswer(this,'top','`+splitCharTOP[i]+`','`+i+`')">`+splitCharTOP[i]+`</div>`)
      $("#gamePlayAnswer").append('<div></div>')

      $("#gamePlaySuccessAnswer").append(`<div>`+splitCharTOP2[i]+`</div>`)
      $("#gamePlayGameoverAnswer").append(`<div class="disable2">`+splitCharTOP[i]+`</div>`)
    }
    for(let i=0;i<splitCharBOTTOM.length;i++){
      $("#gamePlayOpsi").append(`<div onclick="putCharAnswer(this,'bottom','`+splitCharBOTTOM[i]+`','`+i+`')">`+splitCharBOTTOM[i]+`</div>`)
      $("#gamePlayAnswerBottom").append('<div></div>')

      $("#gamePlaySuccessAnswerBottom").append(`<div>`+splitCharBOTTOM2[i]+`</div>`)
      $("#gamePlayGameoverAnswerBottom").append(`<div class="disable2">`+splitCharBOTTOM[i]+`</div>`)
    }
    $("#pageFront").addClass("hide")
    $("#pageGameplay").removeClass("hide")
    countDownTimer()

  }, 3000);

}

function putCharAnswer(x,pos,char,poschar){
  btnSound.play()

  latestAnswer = pos
  slotAnswerNumberAll += 1

  console.log(splitCharTOP.length)

  if(slotAnswerNumber < splitCharTOP.length){
    slotAnswerNumber += 1
    console.log(slotAnswerNumber)
    $('#gamePlayAnswer > div:nth-child('+slotAnswerNumber+')').html(char)
    slotAnswer.push({'pos':poschar,'char':char})
  }else{
    slotAnswerNumberBottom += 1
    console.log(slotAnswerNumberBottom)
    $('#gamePlayAnswerBottom > div:nth-child('+slotAnswerNumberBottom+')').html(char)
    slotAnswerBottom.push({'pos':poschar,'char':char})
  }

  slotAnswerAll.push({'pos':pos,'poschar':poschar,'char':char})
  $(x).addClass("disable")

  if(slotAnswer.length >= 1 || slotAnswerBottom.length >= 1){
    $(".clearbtn").removeClass('hide')
  }

  if(slotAnswer.length == splitCharTOP.length && slotAnswerBottom.length == splitCharBOTTOM.length){
    $(".enterbtn").removeClass('hide')
  }
}

function clearBtn(){
  btnSound.play()
  $(".gameplayAnswer > div").removeClass('shake')
  $(".enterbtn").addClass('hide')
  slotAnswerNumberAll -= 1
  let getValueLastAnswer = slotAnswerAll[slotAnswerNumberAll]
  console.log(getValueLastAnswer)

  // if(slotAnswerNumber <= splitCharTOP.length){
  //   $('#gamePlayAnswer > div:nth-child('+slotAnswerNumber+')').html('')
  //   slotAnswerNumber -= 1
  //   slotAnswer.remove(slotAnswer[slotAnswerNumber]);
  //   console.log(slotAnswer)
  // }else{
  //   $('#gamePlayAnswerBottom > div:nth-child('+slotAnswerNumberBottom+')').html('')
  //   slotAnswerNumberBottom -= 1
  //   slotAnswerBottom.remove(slotAnswerBottom[slotAnswerNumberBottom]);
  //   console.log(slotAnswerBottom)
  // }

  if(slotAnswerNumberBottom > 0){
    $('#gamePlayAnswerBottom > div:nth-child('+slotAnswerNumberBottom+')').html('')
    slotAnswerNumberBottom -= 1
    slotAnswerBottom.remove(slotAnswerBottom[slotAnswerNumberBottom]);
    console.log(slotAnswerBottom)
  }else{
    console.log("UPDATE ATAS")
    $('#gamePlayAnswer > div:nth-child('+slotAnswerNumber+')').html('')
    slotAnswerNumber -= 1
    slotAnswer.remove(slotAnswer[slotAnswerNumber]);
    console.log(slotAnswer)
  }

  if(getValueLastAnswer.pos == 'top'){
    let kuranginPosChar = parseInt(getValueLastAnswer.poschar) + 1
    $('#gamePlayOpsi > div:nth-child('+kuranginPosChar+')').removeClass("disable")
  }else{
    let kuranginPosChar = parseInt(getValueLastAnswer.poschar) + 1
    let tambahWabah = splitCharTOP.length + kuranginPosChar
    $('#gamePlayOpsi > div:nth-child('+tambahWabah+')').removeClass("disable")
  }
  console.log(slotAnswerNumber)
  console.log(slotAnswerNumberBottom)
  console.log(slotAnswerNumberAll)
  slotAnswerAll.remove(slotAnswerAll[slotAnswerNumberAll]);

  // if(getValueLastAnswer.pos == 'top'){
  //   $('#gamePlayAnswer > div:nth-child('+slotAnswerNumber+')').html('')
  //   slotAnswerNumber -= 1
  //   let kuranginPosChar = parseInt(getValueLastAnswer.poschar) + 1
  //   $('#gamePlayOpsi > div:nth-child('+kuranginPosChar+')').removeClass("disable")
  //   slotAnswer.remove(slotAnswer[slotAnswerNumber]);
  // }else{
  //   $('#gamePlayAnswerBottom > div:nth-child('+slotAnswerNumberBottom+')').html('')
  //   slotAnswerNumberBottom -= 1
  //   let kuranginPosChar = parseInt(getValueLastAnswer.poschar) + 1
  //   $('#gamePlayOpsiBottom > div:nth-child('+kuranginPosChar+')').removeClass("disable")
  //   slotAnswerBottom.remove(slotAnswerBottom[slotAnswerNumberBottom]);
  // }

  // if(slotAnswerNumber < splitCharTOP.length){
  //   $('#gamePlayAnswer > div:nth-child('+slotAnswerNumber+')').html('')
  //   slotAnswerNumber -= 1
  //   let kuranginPosChar = parseInt(getValueLastAnswer.poschar) + 1
  //   $('#gamePlayOpsi > div:nth-child('+kuranginPosChar+')').removeClass("disable")
  //   slotAnswer.remove(slotAnswer[slotAnswerNumber]);
  // }else{
  //   $('#gamePlayAnswerBottom > div:nth-child('+slotAnswerNumberBottom+')').html('')
  //   slotAnswerNumberBottom -= 1
  //   let kuranginPosChar = parseInt(getValueLastAnswer.poschar) + 1
  //   $('#gamePlayOpsiBottom > div:nth-child('+kuranginPosChar+')').removeClass("disable")
  //   slotAnswerBottom.remove(slotAnswerBottom[slotAnswerNumberBottom]);
  // }


  // slotAnswerAll.remove(slotAnswerAll[slotAnswerNumberAll]);

  if(slotAnswerAll == 0){
    $(".clearbtn").addClass('hide')
  }

}

function enterBtn(){
  btnSound.play()

  console.log(slotAnswerAll)
  console.log(slotAnswer)
  console.log(slotAnswerBottom)

  if(slotAnswer.length == splitCharTOP.length && slotAnswerBottom.length == splitCharBOTTOM.length){
    let gabungJawabanTop = '';
    slotAnswer.forEach((text) => gabungJawabanTop += `${text.char}`);
    // console.log(gabungJawabanTop)

    let gabungJawabanBottom = '';
    slotAnswerBottom.forEach((text) => gabungJawabanBottom += `${text.char}`);
    // console.log(gabungJawabanBottom)

    if(gabungJawabanTop === pilihopsiTOP && gabungJawabanBottom === pilihopsiBOTTOM){
      // console.log("BENAR")
      opsiJawaban.remove(opsiJawaban[getNumber]);
      maxRandom -= 1;

      gameOver('success')
    }else{
      nyawa += 1
      $(".gameplayAnswer > div").addClass('shake')
      $('.gameplay-nyawa .block-image').addClass('hide')
      $('.gameplay-nyawa .block-image').removeClass('show')
      $('.gameplay-nyawa .block-image:nth-child('+nyawa+')').addClass('show')

      if(nyawa > 3){
        console.log("GAMEOVER")
        gameOver('lost')
      }else{
        console.log("SALAH")
      }
    }

  }
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


let statusTutupPintu = true
function tutupPintu(){
  if(statusTutupPintu){
    statusTutupPintu = false
    $("#debugTutup span").html("TPO")
  }else{
    statusTutupPintu = true
    $("#debugTutup span").html("TP")
  }
  // console.log("Tutup Pintu")
  //  SOCKET
  socket.emit('close', 1)
  //  SOCKET
}

let statusBukaPintu = true
function bukaPintu(){
  if(statusBukaPintu){
    statusBukaPintu = false
    $("#debugBuka span").html("BPO")
  }else{
    statusBukaPintu = true
    $("#debugBuka span").html("BP")
  }
  // console.log("Buka Pintu")
  //  SOCKET
  socket.emit('success', 1)
  //  SOCKET
}

function gameOver(mode){
  waktuBatasMainGame = clearInterval(waktuBatasMainGame);

  $("#pageGameplay").addClass("hide")
  $(".gameplay-top").addClass("hide")

  localStorage.setItem('opsiJawabanStore', JSON.stringify(opsiJawaban));
  localStorage.setItem('maxRandomStore', maxRandom);

  if(mode == 'success'){
    $("#pageSuccess").removeClass("hide")
  }else{
    $("#pageGameover").removeClass("hide")
  }

}

function claimHadiah(){
  //  SOCKET
  // socket.emit('success', 1)
  // //  !SOCKET

  // btnSound.play()
  // $("#pageFront").removeClass("hide")
  // $("#pageSuccess").addClass("hide")

  // $("#debugTutup").show()
  // $("#debugBuka").show()
  // $("#setupTimer").show()
  // $("#debugKisi").hide()

  // setTimeout(() => {
  //   reload()
  // }, 200);

  $("#pageSuccess").addClass("hide")
  $("#pageGameplayNumber").removeClass("hide")
}

function backHome(){
  $("#pleaseWaitFront .block-image:nth-child(3)").css('opacity','1')
  $(".htp").addClass('hideSomething')
  $(".front .pleaseWait").hide()
  $(".front .logo").show()
  $("#pageFront").removeClass('disable')

  btnSound.play()
  $("#pageFront").removeClass("hide")
  $("#pageGameover").addClass("hide")

  $("#debugTutup").show()
  $("#debugBuka").show()
  $("#setupTimer").show()
  $("#debugKisi").hide()

  setTimeout(() => {
    reload()
  }, 200);
}

function reset(){
  maxRandom = 9
    opsiJawaban = [
      {
        text: 'HAVEAGRAPE',
        text2: 'DAY'
      },
      {
        text: 'BERRYGOOD',
        text2: 'JOB'
      },
      {
        text: 'ONEIN',
        text2: 'AMELON'
      },
      {
        text: 'FEELING',
        text2: 'PEACHY'
      },
      {
        text: 'PEACH',
        text2: 'OFCAKE'
      },
      {
        text: 'GRAPE',
        text2: 'JOB'
      },
      {
        text: 'BERRY',
        text2: 'LIANT'
      },
      {
        text: 'MELON',
        text2: 'DOLLAR'
      },
      {
        text: 'ALWAYS',
        text2: 'VIBRANT'
      },
      {
        text: 'LIFEIS',
        text2: 'APEACH'
      }
    ]
    localStorage.setItem('opsiJawabanStore', JSON.stringify(opsiJawaban));
    localStorage.setItem('maxRandomStore', maxRandom);

    setTimeout(() => {
      location.reload()
    }, 200);
}

function reload(){
  console.log(maxRandom)
  if(maxRandom < 0){
    maxRandom = 9
    opsiJawaban = [
      {
        text: 'HAVEAGRAPE',
        text2: 'DAY'
      },
      {
        text: 'BERRYGOOD',
        text2: 'JOB'
      },
      {
        text: 'ONEIN',
        text2: 'AMELON'
      },
      {
        text: 'FEELING',
        text2: 'PEACHY'
      },
      {
        text: 'PEACH',
        text2: 'OFCAKE'
      },
      {
        text: 'GRAPE',
        text2: 'JOB'
      },
      {
        text: 'BERRY',
        text2: 'LIANT'
      },
      {
        text: 'MELON',
        text2: 'DOLLAR'
      },
      {
        text: 'ALWAYS',
        text2: 'VIBRANT'
      },
      {
        text: 'LIFEIS',
        text2: 'APEACH'
      }
    ]
    localStorage.setItem('opsiJawabanStore', JSON.stringify(opsiJawaban));
    localStorage.setItem('maxRandomStore', maxRandom);

    setTimeout(() => {
      location.reload()
    }, 200);

    // console.log("RELOAD")
  }


  $('.gameplay-nyawa .block-image').addClass('hide')
  $('.gameplay-nyawa .block-image').removeClass('show')
  $('.gameplay-nyawa .block-image:nth-child(1)').addClass('show')
  $(".enterbtn").addClass('hide')
  $(".clearbtn").addClass('hide')


  $("#gamePlayOpsi").html('')
  // $("#gamePlayOpsiBottom").html('')
  $("#gamePlayAnswer").html('')
  $("#gamePlayAnswerBottom").html('')


  $("#gamePlaySuccessAnswer").html('')
  $("#gamePlaySuccessAnswerBottom").html('')
  $("#gamePlayGameoverAnswer").html('')
  $("#gamePlayGameoverAnswerBottom").html('')

  slotAnswer = [], slotAnswerBottom = [], slotAnswerAll = [], slotAnswerNumber = 0, slotAnswerNumberBottom = 0, slotAnswerNumberAll= 0, nyawa = 1;
}

function reloadPage(){
  // console.log("RELOAD")
  location.reload()
}

let showkisi2 = false
function showKisi(){
  if(!showkisi2){
    showkisi2 = true
    $("#kisi2").show()
  }else{
    showkisi2 = false
    $("#kisi2").hide()
  }
}

// NUMBER
(function(){
  const maxRows = 4;
  const digitsPerRow = 4;
  const board = document.getElementById('board');
  const statusEl = document.getElementById('status');
  const resetBtn = document.getElementById('resetBtn');
  const pad = document.getElementById('pad');

  let secret = genSecret();
  let curRow = 0;
  let curCol = 0;
  let locked = false;

  initBoard();
  highlightActive();

  // function genSecret(){
  //   return Array.from({length:digitsPerRow}, () => Math.floor(Math.random()*10).toString());
  // }
  function genSecret(){
    const digits = [];
    while(digits.length < digitsPerRow){
      const rand = Math.floor(Math.random() * 10).toString();
      if(!digits.includes(rand)){
        digits.push(rand);
      }
    }
    return digits;
  }

  function initBoard(){
    console.log(secret)
    board.innerHTML = '';
    for(let r = 0; r < maxRows; r++){
      for(let c = 0; c < digitsPerRow; c++){
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.dataset.r = r;
        tile.dataset.c = c;
        board.appendChild(tile);
      }
    }
  }

  function getTile(r, c){
    return board.querySelector(`.tile[data-r="${r}"][data-c="${c}"]`);
  }

  function highlightActive(){
    board.querySelectorAll('.tile').forEach(t => t.classList.remove('active'));
    if(locked) return;
    const t = getTile(curRow, curCol);
    if(t) t.classList.add('active');
  }

  function inputDigit(d){
    if(locked) return;
    if(curRow >= maxRows) return;
    if(curCol >= digitsPerRow) return;

    const tile = getTile(curRow, curCol);
    tile.textContent = d;
    tile.classList.remove('gray','yellow','green');
    curCol++;

    if(curCol === digitsPerRow) {
      statusEl.textContent = 'Tekan Enter untuk cek, atau Back untuk edit.';
    }
    highlightActive();
  }

  function backspace(){
    if(locked) return;
    if(curCol === 0) return;

    curCol--;
    const tile = getTile(curRow, curCol);
    tile.textContent = '';
    tile.classList.remove('gray','yellow','green');
    statusEl.textContent = 'Masukkan 4 angka (4 percobaan)';
    highlightActive();
  }

  function submitRow(){
    if(locked) return;
    if(curCol < digitsPerRow) return;

    const guess = Array.from({length:digitsPerRow}, (_,i) => getTile(curRow, i).textContent);
    const secretCopy = [...secret];
    const usedGuess = Array(digitsPerRow).fill(false);

    // GREEN
    for(let i = 0; i < digitsPerRow; i++){
      const tile = getTile(curRow, i);
      if(guess[i] === secret[i]){
        tile.classList.add('green');
        secretCopy[i] = null;
        usedGuess[i] = true;
      }
    }

    // YELLOW / GRAY
    for(let i = 0; i < digitsPerRow; i++){
      if(usedGuess[i]) continue;
      const tile = getTile(curRow, i);
      const idx = secretCopy.indexOf(guess[i]);
      if(idx > -1){
        tile.classList.add('yellow');
        secretCopy[idx] = null;
      } else {
        tile.classList.add('gray');
      }
    }

    if(guess.join('') === secret.join('')){
      statusEl.textContent = `Berhasil! Kode: ${secret.join('')}`;
      alert(`Berhasil! Kode: ${secret.join('')}`); // ✅ ALERT DI SINI
      locked = true;
      return;
    }

    curRow++;
    curCol = 0;
    if(curRow >= maxRows){
      statusEl.textContent = `Gagal. Kode: ${secret.join('')}`;
      locked = true;
      return;
    }

    statusEl.textContent = `Kesempatan tersisa: ${maxRows - curRow}`;
    highlightActive();
  }

  pad.addEventListener('click', (e) => {
    const k = e.target.closest('.key');
    if(!k) return;
    const act = k.dataset.action;
    if(act === 'back') backspace();
    else if(act === 'enter') submitRow();
    else inputDigit(k.textContent.trim());
  });

  window.addEventListener('keydown', (e) => {
    if(/^[0-9]$/.test(e.key)) inputDigit(e.key);
    else if(e.key === 'Backspace') backspace();
    else if(e.key === 'Enter') submitRow();
  });

  resetBtn.addEventListener('click', () => {
    secret = genSecret();
    curRow = 0;
    curCol = 0;
    locked = false;
    initBoard();
    statusEl.textContent = 'Masukkan 4 angka (4 percobaan)';
    highlightActive();
  });

})();