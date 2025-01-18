//感谢您使用HWUI，当您使用HWUI时，请不要修改load函数中的内容，这是不仅是对开发者的尊重，更是对开源社区的尊重，感谢您的理解，祝您的程序永不出BUG！
//您可以修改除load以外的所有函数内容 但请您标注“由HWUI修改”等字样 开源社区将因您变得更好！
//使用本UI请同时加载CSS与JS文件，请注意：UI的JS文件请优先加载，否则可能会调用失败！
//当前版本Priview 1.3.0
load();

function loadHwElement() {
    LoadButton();
    LoadHwInput();
    LoadHwSwitch();
    LoadHwList();
    LoadHwCode();
    LoadHwCheckbox();
    LoadPopover();
}

window.onload = function () {
    loadHwElement();
    loadHWDialog();
}

let bodyEleNum = 0;
let firstLoad = false;
setInterval(() => {
    loadHwElement();
}, 10);
function exp() {
    const allexp = document.querySelectorAll("exp");

    for (let i = 0; i < allexp.length; i++) {
        if (!allexp[i].classList.contains("HWUI-Element")) {


            AddHWUIClass(allexp[i]);
        }
    }
}

function LoadPopover() {
    const popovers = document.querySelectorAll("hw-popover");

    for (let i = 0; i < popovers.length; i++) {
        if (!popovers[i].classList.contains("HWUI-Element")) {
            const popover = document.createElement("hw-popover-main");
            const popover_before = document.createElement("hw-popover-before");
            const popover_room = document.createElement("hw-popover-room");

        
            const title = popovers[i].getAttribute("title");
            const content = popovers[i].getAttribute("content");
            const contentElement = document.createElement("div");

            contentElement.classList.add("popover-content");
            contentElement.textContent = content;

            const titleElement = document.createElement("div");
            titleElement.classList.add("popover-title");
            titleElement.textContent = title;

            popover_room.appendChild(titleElement);
            popover_room.appendChild(contentElement);

            const temp = popovers[i].querySelectorAll("*");
            for (let b = 0; b < temp.length; b++) {
                if (!temp[b].classList.contains("popover-trigger")) {
                    popover_room.appendChild(temp[b]);
                }
            }

            popovers[i].style.position = "relative"; 


            const roomHeight = popover_room.offsetHeight;
            const roomWidth = popover_room.offsetWidth;
            if (roomHeight > 200) {
                popover_room.style.maxHeight = "200px";
                popover_room.style.overflowY = "auto";
            }

            if (roomWidth > 300) {
                popover_room.style.maxWidth = "300px";
            }


            popover.appendChild(popover_room);
            popover.appendChild(popover_before);


            popovers[i].appendChild(popover);


            AddHWUIClass(popovers[i]);
        }
    }
}



function LoadHwCheckbox() {
    const checkboxs = document.querySelectorAll("hw-checkbox");

    for (let i = 0; i < checkboxs.length; i++) {
        if (!checkboxs[i].classList.contains("HWUI-Element")) {
            checkboxs[i].active = false;

            checkboxs[i].active = checkboxs[i].getAttribute("active");
            if (checkboxs[i].active != "true") {
                checkboxs[i].active = false;
                checkboxs[i].setAttribute("active", false);
            } else {
                checkboxs[i].active = true;
                checkboxs[i].setAttribute("active", true);
            }

            const box = document.createElement("hwEle");
            const mark = document.createElement("hwEle");
            const mark1 = document.createElement("hwEle");
            const mark2 = document.createElement("hwEle");
            const title = document.createElement("hwEle");

            box.classList.add("box");
            mark.classList.add("mark");
            mark1.classList.add("mark1");
            mark2.classList.add("mark2");
            title.classList.add("title");

            title.innerHTML = checkboxs[i].innerHTML;
            checkboxs[i].innerHTML = "";

            mark.appendChild(mark1);
            mark.appendChild(mark2);
            box.appendChild(mark);
            checkboxs[i].appendChild(box);
            checkboxs[i].appendChild(title);

            checkboxs[i].addEventListener("click", function () {
                console.log(checkboxs[i].active === true)
                if (checkboxs[i].active === true) {

                    checkboxs[i].active = false;
                    checkboxs[i].setAttribute("active", false);
                } else {
                    checkboxs[i].active = true;
                    checkboxs[i].setAttribute("active", true);
                }
            })

            AddHWUIClass(checkboxs[i]);
        }
    }
} function LoadHwList() {
    const allHwList = document.querySelectorAll("hw-list");

    for (let i = 0; i < allHwList.length; i++) {
        if (!allHwList[i].classList.contains("HWUI-Element")) {
            //子元素处理
            const items = allHwList[i].querySelectorAll("*");
            const room = document.createElement("div");

            while (allHwList[i].firstChild) {
                var node = allHwList[i].firstChild;
                room.appendChild(node); // 参数 true 表示复制子元素及其所有内容
            }

            allHwList[i].active = allHwList[i].getAttribute("active");
            if (allHwList[i].active != "true") {
                allHwList[i].active = "false";
                allHwList[i].setAttribute("active", "false");
            }

            const head = document.createElement("div");
            const title = document.createElement("div");
            const openButton = document.createElement("div");

            openButton.classList.add("hw-openButton");
            head.classList.add("hw-head");
            room.classList.add("hw-room");

            openButton.addEventListener("click", function () {
                console.log(allHwList[i].active)
                if (allHwList[i].active === "true") {
                    allHwList[i].active = "false";
                    allHwList[i].setAttribute("active", "false");
                } else {
                    allHwList[i].active = "true";
                    allHwList[i].setAttribute("active", "true");
                }
            })

            title.innerHTML = allHwList[i].getAttribute("title");
            title.classList.add("hw-title");

            setInterval(function () {
                allHwList[i].setAttribute("active", allHwList[i].active);
            }, 50)

            allHwList[i].appendChild(head);
            head.appendChild(title);
            head.appendChild(openButton);
            allHwList[i].appendChild(room);
            AddHWUIClass(allHwList[i]);
        }
    }
}

function RestWindowBack(window, back) {
    window.style.scale = 0;
    window.style.marginTop = "-10%"
    back.style.opacity = 0;
    back.style.pointerEvents = "none";
}

function HWMessage(msg, type, icon, time) {
    const room = document.createElement("hw-message-room");
    const message = document.createElement("hw-message");
    const text = document.createElement("hw-text");

    text.innerHTML = msg;

    message.appendChild(text);
    room.appendChild(message);

    message.setAttribute("data-type", type || 'normal');


    // 把所有现存Message向下移
    const rooms = document.querySelectorAll("hw-message-room");
    for (let i = 0; i < rooms.length; i++) {
        setTimeout(function () {
            rooms[i].style.top = (rooms.length - i) * 50 + "px";
        }, (rooms.length - i) * 25)
    }

    room.style.top = "-80px";
    setTimeout(function () {
        room.style.top = "0px";
    }, 10)

    if (time === undefined) {
        time = 3000;
    }

    setTimeout(function () {
        room.style.top = "calc(" + room.style.top + " + 30px)";
        room.style.scale = "0.8";
        room.style.opacity = "0";
        room.style.zIndex = "99999999999";
        setTimeout(function () {
            room.remove();
            setTimeout(function () {
                // 把所有现存Message向下移
                const rooms = document.querySelectorAll("hw-message-room");
                for (let i = 0; i < rooms.length; i++) {
                    setTimeout(function () {
                        rooms[i].style.top = (rooms.length - i - 1) * 50 + "px";
                    }, (rooms.length - i) * 25)
                }
            }, 1)
        }, 200)
    }, time)
    
    document.body.appendChild(room);
}

function LoadHwCode() {
    const hwCode = document.querySelectorAll("hw-code");

    for (let n = 0; n < hwCode.length; n++) {
        if (!hwCode[n].classList.contains("HWUI-Element")) {
            var code = hwCode[n].innerHTML.split(/[\r\n]+/);

            hwCode[n].innerHTML = "";
            for (let i = 0; i < code.length; i++) {

                const line = document.createElement("div");
                const num = document.createElement("span");
                const codeLine = document.createElement("span");


                codeLine.innerHTML = code[i];

                line.style.display = "block";

                num.style.userSelect = "none";
                num.style.width = "20px"
                num.style.height = "100%";
                num.style.marginRight = "15px";

                num.innerHTML = i + 1;

                line.appendChild(num);
                line.appendChild(codeLine);
                hwCode[n].appendChild(line);


            }
            AddHWUIClass(hwCode[n]);
        }
    }


}


function LoadHwSwitch() {
    const allHwSwitch = document.querySelectorAll("hw-switch");

    for (let i = 0; i < allHwSwitch.length; i++) {
        if (!allHwSwitch[i].classList.contains("HWUI-Element")) {

            allHwSwitch[i].active = false;
            allHwSwitch[i].addEventListener("click", function () {
                allHwSwitch[i].active = !allHwSwitch[i].active;
                if (allHwSwitch[i].getAttribute("active") === "true") {
                    allHwSwitch[i].setAttribute("active", false);
                } else {
                    allHwSwitch[i].setAttribute("active", true);
                }
            }
            )
        }
        AddHWUIClass(allHwSwitch[i]);
    }
}
function LoadButton() {
    const hwButton = document.querySelectorAll("hw-button");

    for (let i = 0; i < hwButton.length; i++) {
        hwButton[i].classList.add("hw-default");
    }
}
function LoadHwInput() {
    const allHwInput = document.querySelectorAll("hw-input");

    for (let i = 0; i < allHwInput.length; i++) {
        if (!allHwInput[i].classList.contains("HWUI-Element")) {
            allHwInput[i].value = "";
            const input = document.createElement("input");
            const placeholder = document.createElement("span");

            input.classList.add("hw-input");
            input.setAttribute("type", allHwInput[i].getAttribute("type"));
            setInterval(function () {
                if (input.value != "") {
                    placeholder.classList.remove("hw-input-ph")
                    placeholder.classList.add("hw-input-ph-2")
                } else {
                    placeholder.classList.remove("hw-input-ph-2")
                    placeholder.classList.add("hw-input-ph")
                }
            }, 10)
            placeholder.classList.add("hw-input-ph");
            placeholder.innerHTML = allHwInput[i].innerHTML;
            allHwInput[i].innerHTML = "";
            allHwInput[i].appendChild(input);
            allHwInput[i].appendChild(placeholder);

            input.addEventListener("input", function () {
                allHwInput[i].value = input.value;
            })

            function rest() {
                input.value = allHwInput[i].value;
            }

            setInterval(rest, 100)

            AddHWUIClass(allHwInput[i]);
        }
    }
}

function loadHWDialog() {
    const dialogs = document.querySelectorAll("hw-dialog");
    console.log(document.querySelectorAll("hw-dialog"))

    for (let i = 0; i < dialogs.length; i++) {
        const back = document.createElement("hw-back");
        const window = document.createElement("hw-window");

        window.appendChild(dialogs[i]);
        back.appendChild(window);
        back.classList.add("hw-dialog");
        back.id = dialogs[i].id;
        dialogs[i].id = null;
        dialogs[i].classList.forEach(className => {
            back.classList.add(className);
        });
        RestWindowBack(window, back);
        document.body.appendChild(back);
    }

}

const HWDialog = (function () {
    function open(dialog) {
        openWindow(dialog, dialog.querySelector("hw-window"));
    }

    function close(dialog) {
        closeWindow(dialog, dialog.querySelector("hw-window"), false);
    }

    return {
        open: open,
        close: close
    };
})();

const HWMessageBox = (function () {
    function HWalert(msg, title, buttonText, callback) {
        //默认返回值
        var result = "error";

        const back = document.createElement("hw-back");
        const window = document.createElement("hw-window");
        const titleEl = document.createElement("div");
        const textEl = document.createElement("div");
        const buttonEl = document.createElement("hw-button");
        const closeButton = document.createElement("hw-closebutton");

        titleEl.style.color = "#4e4e4e";
        titleEl.style.fontWeight = 900;
        titleEl.style.fontSize = "24px";
        titleEl.style.marginBottom = "5px";
        titleEl.style.marginRight = "30px";
        textEl.style.color = "#757575";
        textEl.style.fontSize = "16px";

        buttonEl.style.float = "right";
        buttonEl.style.marginTop = "5px";

        titleEl.innerHTML = title;
        textEl.innerHTML = msg;
        buttonEl.innerHTML = buttonText;

        closeButton.style.top = "10px";
        closeButton.style.right = "10px";
        closeButton.style.position = "absolute";
        closeButton.classList.add("hw-closebutton");

        buttonEl.addEventListener("click", function () {
            result = "button";
            closeWindow(back, window, true);
            if (callback != undefined) {
                callback(result);
            }
        })

        closeButton.addEventListener("click", function () {
            result = "close";
            closeWindow(back, window);
            if (callback != undefined) {
                callback(result);
            }
        })


        if (title === undefined) {
            textEl.style.marginRight = "40px";
            titleEl.innerHTML = "";
        }
        window.appendChild(titleEl);


        if (buttonText === "" || buttonText === undefined) {
            buttonEl.innerHTML = "确定";
        }

        window.appendChild(closeButton);
        window.appendChild(textEl);
        window.appendChild(buttonEl);

        back.appendChild(window);
        document.body.appendChild(back);
        openWindow(back, window);
    }

    return {
        alert: HWalert
    };
})();

function openWindow(back, window) {
    back.style.opacity = 0;
    window.style.marginTop = "-10%"
    window.style.scale = 0;
    setTimeout(function () {
        back.style.opacity = 1;
        window.style.marginTop = 0;
        window.style.scale = 1.1;
        setTimeout(function () {
            back.style.pointerEvents = "all";
            window.style.scale = 1;
        }, 300)
    }, 10)
}

function closeWindow(back, window, remove) {
    window.style.scale = 1.1;
    setTimeout(function () {
        window.style.scale = 0;
        window.style.marginTop = "-10%"
        back.style.opacity = 0;
        back.style.pointerEvents = "none";
        setTimeout(function () {
            if (remove) {
                back.remove();
            }

        }, 310)
    }, 300)
}

function GetEleClassChange() {

}

function AddHWUIClass(ele) {
    ele.classList.add("HWUI-Element")
}

function load() {
    //load函数，请不要修改此函数的内容，十分感谢！
    console.log("HWUI已成功加载 | By HiSuperWan");
    console.log("GitHub -> https://github.com/HiSuperWan/HWUI");
    console.log("Website -> hisuperwan.com");
}

