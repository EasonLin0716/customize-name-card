const name = document.querySelector('#nameInput')
const photo = document.querySelector('#photoInput')
const intro = document.querySelector('#introInput')
const submitButton = document.querySelector('#submitButton')
const result = document.querySelector(".result")
const lightTheme = document.querySelector('#lightTheme')
const darkTheme = document.querySelector('#darkTheme')
const nameFeedback = document.querySelector('.nameFeedback')
const introFeedback = document.querySelector('.introFeedback')


submitButton.addEventListener("click", function (event) {

  if (checkName() && checkIntro()) generateCard()
    
})

// 監聽自我介紹字數，滿200字時該行字會消失
intro.addEventListener("input", function (event) {
  let count = 200
  giveFeedback(introFeedback, `還可以輸入${count - intro.value.length}字`, intro, "#99FF99")

  if (count - intro.value.length < 1) {
    giveFeedback(introFeedback, `超過${intro.value.length - count}字!`, intro, "#FFCCCC")
  }
})

name.addEventListener("input", function (event) {
  let count = 20
  if (name.value.length === 0) {
    giveFeedback(nameFeedback, "請輸入姓名", name, "#FFCCCC")
  }
  else if (count - name.value.length < 0) {
    giveFeedback(nameFeedback, "超過字數!!!", name, "#FFCCCC")
  } else {
    giveFeedback(nameFeedback, `剩餘${count - name.value.length}字`, name, "#99FF99")
  }
})

// 套主題(lightTheme不設定任何CSS)
lightTheme.addEventListener("click", function (event) {
  result.classList.remove('dark')
})
// 寫在css裡
darkTheme.addEventListener("click", function (event) {
  result.classList.add('dark')
})


// 函式都在這

// 檢查名稱的函式
function checkName() {
  if (name.value === "" || name.value.length > 20) {
    // 名字不能是空值或大於20個字
    alertUser('請填上您的姓名(二十個字內)', name)
    return false 
  } 
  return true
}


// 檢查自我介紹的函式
function checkIntro() {
  if (intro.value.length > 200) {
    // 自我介紹不能少於200字
    alertUser('自我介紹處不能超過200字', intro)
    return false
  }
  return true
}


// 產生名片的函式
function generateCard() {
  // 這是submit成功時會產出的名片
    result.innerHTML = `
    <div class="container-fluid addBorder">
      <div class="row align-items-center justify-content-center">
        <div class="col-8 pr-4 m-0">
          <h3 class="m-4">${name.value}</h3>
          <p class="ml-4">${intro.value}</p>
        </div>
        <div class="col-4 m-0">
          <img class= "img-fluid p-2" id="myImage" src="${photo.value}" alt="avator">
        </div>
      </div>
    </div>
    `

    // 如果使用者沒有輸入圖片，會產生一個假圖片
    if (photo.value === "") {
      document.querySelector('#myImage').src = "https://via.placeholder.com/300"
    }
}


// 產生警告視窗並將不符合規定的區塊轉為紅色
function alertUser(alertWord, affectingPart) {
  alert(alertWord)
  affectingPart.style = "background-color: red;"
}

// feedbackPart: 產生提示的區塊; feedbackWord: 產生提示的文字
// affectingPart: 影響的區塊; color: 影響區塊改變的顏色
function giveFeedback(feedbackPart, feedbackWord, affectingPart, color) {
  feedbackPart.innerText = feedbackWord
  affectingPart.style = `background-color: ${color};`
}