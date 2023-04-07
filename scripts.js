function saveSession() {
  const section = document.getElementById('target').innerHTML;

  const textEditor = document.getElementById('myText');
  const contEditor = document.getElementById('myContainer');
  const btnEditor = document.getElementById('myBtn');
  const imgEditor = document.getElementById('myImg');

  textEditor.style.animationName = "exit";
  contEditor.style.animationName = "exit";
  btnEditor.style.animationName = "exit";
  imgEditor.style.animationName = "exit";

  setTimeout(function () {
    textEditor.style.display = 'none';
    contEditor.style.display = 'none';
    btnEditor.style.display = 'none';
    imgEditor.style.display = 'none';
  }, 480);

  
  var saveSections = section;
  document.getElementById('savingText').innerHTML = 'Saving to your Local Storage';
  document.getElementById('loading').style.display = 'flex';
  document.getElementById('production').style.overflowY = 'hidden';

    if (typeof (Storage) !== "undefined") {
      localStorage.setItem("sections", saveSections);

      setTimeout(function () {
        document.getElementById('savingText').innerHTML = 'Saved Successfully!';
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('success').style.display = 'block';
      }, 1200);

      setTimeout(function () {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('spinner').style.display = 'block';
        document.getElementById('success').style.display = 'none';
        document.getElementById('production').style.overflowY = 'visible';
      }, 1800);

    } else {
      setTimeout(function () {
        document.getElementById('success').style.display = 'block';
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('savingText').innerHTML = 'Unable to Save because your browser does not support Local Storage';
      }, 1200);

      setTimeout(function () {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('savingText').innerHTML = 'Saving to your Local Storage';
        document.getElementById('spinner').style.display = 'block';
        document.getElementById('success').style.display = 'none';
        document.getElementById('production').style.overflowY = 'visible';
      }, 2300);
    }
}

document.getElementById("target").innerHTML = localStorage.getItem("sections");

function imgError() {
  setTimeout(function () {
    const imgs = document.querySelectorAll("#target #img-Output");
    imgs.forEach(img => {
	img.alt = 'Unable to load images from local storage.';
      img.src = "https://i.ibb.co/7QCynM5/img-pholder.png";
    });
  }, 1500);
}
   
function collapseExpand() {
  const editorOption = document.getElementById('editOption');
  editorOption.classList.remove("expand");
  editorOption.classList.toggle("collapsed");
}


// function hoverOut() {
//    var elId = event.target.id;
// const hoverItem = document.getElementById(elId);
// hoverItem.classList.remove('hover');
// const hoverChildItem = hoverItem.querySelector('#target .secActBtns')
// hoverChildItem.style.display = "none";
// }

// function hoverBlk(event) {
//   const txtElId = event.target.parentElement.id;
//     const hoverTxtItem = document.getElementById(txtElId);
//     hoverTxtItem.classList.add('hover');
//  }

// function hoverBlkOut(event) {
//   const txtElId = event.target.parentElement.id;
//     const hoverTxtItem = document.getElementById(txtElId);
//     hoverTxtItem.classList.remove('hover');
//  }


function dragStart(event) {
  event.dataTransfer.setData("id", event.target.id);

  // let toDel = event.target.id;
  // const item = toDel.includes('-');

  // if (item == true) {
  //   const trashCan = document.querySelector('#trash');
  //   trashCan.style.color = '#898989';
  //   trashCan.style.fontSize = '2.5em';
  // }
}

function colDragStart(event) {
  event.dataTransfer.setData("id", event.target.id);

  const rows = document.querySelectorAll('.row');
  rows.forEach(row => {
    row.style.outline = "solid 1px red";
  });
}

function blkDragStart(event) {
  event.dataTransfer.setData("id", event.target.id);
  const columns = document.querySelectorAll('.column');
  columns.forEach(column => {
    column.style.outline = "solid 1px orange";
  });


  function dragEnd(event) {
    event.preventDefault();
    const cols = document.querySelectorAll('#target .column');
    cols.forEach(col => {
      const colChildren = col.children.length;
      if (colChildren == 3) {
        colChildren.classList.add("emptyCol");
      }
    });
  }
}

function dragging(event) {
  event.preventDefault();
}

function allowDrop(event) {
  event.preventDefault();
}

function dragOver(event) {
  event.preventDefault();
  // event.target.style.color = '#68217a';
}

function dragOverCont(event) {
  event.preventDefault();
  // event.target.style.outline = 'solid 1px';
}

function stopDrop(event) {
  event.preventDefault();
  // event.target.style.color = '#dddddd';
}

function dropSec(event) {
  event.preventDefault();

  const secId = event.dataTransfer.getData("id");
  let dropzone = event.target.id;
  const targetId = dropzone.includes("section-");
  const moveSec = secId.includes('section-');

  if (secId == "sectionBlk" && event.target.id == "target") {
    const secNode = document.getElementById(secId);
    const cloneSec = secNode.cloneNode(true);
    document.getElementById("obj-sec").appendChild(cloneSec);
    const newId = Math.floor(Math.random() * Date.now());
    event.target.appendChild(document.getElementById(secId)).setAttribute("id", "section-" + newId);
  }
  if (secId == "sectionBlk" && targetId == true) {
    const secNode = document.getElementById(secId);
    const cloneSec = secNode.cloneNode(true);
    document.getElementById("obj-sec").appendChild(cloneSec);
    const newId = Math.floor(Math.random() * Date.now());
    event.target.parentElement.appendChild(document.getElementById(secId)).setAttribute("id", "section-" + newId);
  }
  if (moveSec == true && targetId == true) {
    event.target.parentElement.appendChild(document.getElementById(secId));
  }
}

function dropCol(event) {
  event.preventDefault();

  const rows = document.querySelectorAll('.row');
  rows.forEach(row => {
    row.style.outline = "";
  });

  let dropzone = event.target.id;
  let blkClass = event.target.className;
  const targetId = dropzone.includes("column-")
  const coldata = event.dataTransfer.getData("id");
  const targetBlkId = blkClass.includes("innerBlk")
  const newRowId = dropzone.includes("row-");
  const moveCol = coldata.includes('column-');
  const col2row = coldata == "column" && event.target.id == "row";
  const col2colId = coldata == "column" && targetId == true;
  const col2blk = coldata == "column" && targetBlkId == true;
  const col2rowId = coldata == "column" && newRowId == true;
  const colId2row = moveCol == true && event.target.id == "row";
  const colId2rowId = moveCol == true && newRowId == true;
  const colId2colId = moveCol == true && targetId == true;
  const colId2blk = moveCol == true && targetBlkId == true;

  if (col2row) {
    const node = document.getElementById(coldata);
    const cloneCol = node.cloneNode(true);
    document.getElementById("obj-col").appendChild(cloneCol);
    const newId = Math.floor(Math.random() * Date.now());
    event.target.appendChild(document.getElementById(coldata)).setAttribute("id", "column-" + newId);
    const rowId = event.target.parentElement.id;
    const setRowId = document.getElementById(rowId).firstElementChild;
    setRowId.setAttribute("id", "row-" + newId)
  }

  if (col2colId) {
    const node = document.getElementById(coldata);
    const cloneCol = node.cloneNode(true);
    document.getElementById("obj-col").appendChild(cloneCol);
    const newId = Math.floor(Math.random() * Date.now());
    event.target.parentElement.appendChild(document.getElementById(coldata)).setAttribute("id", "column-" + newId);
  }

  if (col2blk) {
    const node = document.getElementById(coldata);
    const cloneCol = node.cloneNode(true);
    document.getElementById("obj-col").appendChild(cloneCol);
    const newId = Math.floor(Math.random() * Date.now());
    event.target.parentElement.parentElement.parentElement.appendChild(document.getElementById(coldata)).setAttribute("id", "column-" + newId);
  }

  if (col2rowId) {
    const node = document.getElementById(coldata);
    const cloneCol = node.cloneNode(true);
    document.getElementById("obj-col").appendChild(cloneCol);
    const newId = Math.floor(Math.random() * Date.now());
    event.target.appendChild(document.getElementById(coldata)).setAttribute("id", "column-" + newId);
  }

  if (colId2row) {
    const newId = Math.floor(Math.random() * Date.now());
    event.target.appendChild(document.getElementById(coldata));
    const rowId = event.target.parentElement.id;
    const setRowId = document.getElementById(rowId).firstElementChild;
    setRowId.setAttribute("id", "row-" + newId)
  }

  if (colId2rowId) {
    event.target.appendChild(document.getElementById(coldata));
  }

  if (colId2colId) {
    event.target.parentElement.appendChild(document.getElementById(coldata));
  }

  if (colId2blk) {
    event.target.parentElement.parentElement.parentElement.appendChild(document.getElementById(coldata));
  }

  // const trashCan = document.querySelector('#trash');
  // trashCan.style.color = '#dddddd';
  // trashCan.style.fontSize = '2em';


}

function dropBlk(event) {

  event.preventDefault();

  const columns = document.querySelectorAll('.column');
  columns.forEach(column => {
    column.style.outline = "";
  });

  const blkdata = event.dataTransfer.getData("id");
  let dropzone = event.target.id;
  let blkClass = event.target.className;
  const targetId = dropzone.includes("column-")
  const targetBlk = blkClass.includes("innerBlk");
  const newId = Math.floor(Math.random() * Date.now());
  const moveBlk = blkdata.includes('blk_');
  const title2col = blkdata == "blkTitle" && targetId == true;
  const title2blk = blkdata == "blkTitle" && targetBlk == true;
  const txt2col = blkdata == "blkTxt" && targetId == true;
  const txt2blk = blkdata == "blkTxt" && targetBlk == true;
  const btn2col = blkdata == "blkBtn" && targetId == true;
  const btn2blk = blkdata == "blkBtn" && targetBlk == true;
  const img2col = blkdata == "blkImg" && targetId == true;
  const img2blk = blkdata == "blkImg" && targetBlk == true;
  const moveblk2col = moveBlk == true && targetId == true;
  const moveblk2blk = moveBlk == true && targetBlk == true;

  if (title2col) {

    const currentCol = document.getElementById(dropzone);
    currentCol.classList.remove("emptyCol");
    //ADD open div if not exist
    const colTarget = event.target.id;
    const colTargetId = document.getElementById(colTarget);
    const colTargetIdLength = colTargetId.children.length;

    if (colTargetIdLength == 1) {
     
      const divOpen = document.createElement("div");
      divOpen.setAttribute("id", "blkOpen-" + newId);
      divOpen.setAttribute("class", "divOpen");
      const divOpenChild = document.createElement("div");
      divOpen.appendChild(divOpenChild).setAttribute("id", "divOpenChild-" + newId)
      event.target.appendChild(divOpen).setAttribute("title", "div-open");
    }

    //ADD block to target
    const node = document.getElementById(blkdata);
    const cloneBlk = node.cloneNode(true);
    document.getElementById("obj-head").appendChild(cloneBlk);
    event.target.appendChild(document.getElementById(blkdata)).setAttribute("id", "blk_Title-" + newId);

    if (colTargetIdLength != 1) {
      //DELETE closing tag if exist then create new one
      const delClose = event.target.lastChild.previousSibling;
      delClose.remove();
      const divClose = document.createElement("div");
      divClose.setAttribute("id", "blkClose-" + newId);
      divClose.setAttribute("class", "divClose");
      const divCloseChild = document.createElement("div");
      divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
      event.target.appendChild(divClose).setAttribute("title", "div-close");
    }
    else {
      //ADD closing div if not exist
      const divClose = document.createElement("div");
      divClose.setAttribute("id", "blkClose-" + newId);
      divClose.setAttribute("class", "divClose");
      const divCloseChild = document.createElement("div");
      divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
      event.target.appendChild(divClose).setAttribute("title", "div-close");
    }
  }

  if (title2blk) {
    const node = document.getElementById(blkdata);
    const cloneBlk = node.cloneNode(true);
    document.getElementById("obj-head").appendChild(cloneBlk);
    event.target.parentElement.parentElement.appendChild(document.getElementById(blkdata)).setAttribute("id", "blkTitle-" + newId);

    const blkTarget = event.target.parentElement.parentElement.id;
    const blkTargetId = document.getElementById(blkTarget);
    const blkTargetIdLength = blkTargetId.children.length;

    if (blkTargetIdLength != 1) {
      //DELETE closing tag if exist then create new one
      const delClose = event.target.parentElement.parentElement.lastChild.previousSibling;
      delClose.remove();
      const divClose = document.createElement("div");
      divClose.setAttribute("id", "blkClose-" + newId);
      divClose.setAttribute("class", "divClose");
      const divCloseChild = document.createElement("div");
      divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
      event.target.parentElement.parentElement.appendChild(divClose).setAttribute("title", "div-close");
    } else {
      //ADD closing div if not exist
      const divClose = document.createElement("div");
      divClose.setAttribute("id", "blkClose-" + newId);
      divClose.setAttribute("class", "divClose");
      const divCloseChild = document.createElement("div");
      divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
      event.target.parentElement.parentElement.appendChild(divClose).setAttribute("title", "div-close");
    }
  }

  if (txt2col) {
    //ADD open div if not exist
    const currentCol = document.getElementById(dropzone);
    currentCol.classList.remove("emptyCol");

    const colTarget = event.target.id;
    const colTargetId = document.getElementById(colTarget);
    const colTargetIdLength = colTargetId.children.length;

    if (colTargetIdLength == 1) {
      const divOpen = document.createElement("div");
      divOpen.setAttribute("id", "blkOpen-" + newId);
      divOpen.setAttribute("class", "divOpen");
      const divOpenChild = document.createElement("div");
      divOpen.appendChild(divOpenChild).setAttribute("id", "divOpenChild-" + newId)
      event.target.appendChild(divOpen).setAttribute("title", "div-open");
    }

    const node = document.getElementById(blkdata);
    const cloneBlk = node.cloneNode(true);
    document.getElementById("obj-text").appendChild(cloneBlk);
    event.target.appendChild(document.getElementById(blkdata)).setAttribute("id", "blk_Txt-" + newId);

    if (colTargetIdLength != 1) {
      //DELETE closing tag if exist then create new one
      const delClose = event.target.lastChild.previousSibling;
      delClose.remove();
      const divClose = document.createElement("div");
      divClose.setAttribute("id", "blkClose-" + newId);
      divClose.setAttribute("class", "divClose");
      const divCloseChild = document.createElement("div");
      divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
      event.target.appendChild(divClose).setAttribute("title", "div-close");
    }
    else {
      //ADD closing div if not exist
      const divClose = document.createElement("div");
      divClose.setAttribute("id", "blkClose-" + newId);
      divClose.setAttribute("class", "divClose");
      const divCloseChild = document.createElement("div");
      divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
      event.target.appendChild(divClose).setAttribute("title", "div-close");
    }
  }

  if (txt2blk) {
    const node = document.getElementById(blkdata);
    const cloneBlk = node.cloneNode(true);
    document.getElementById("obj-text").appendChild(cloneBlk);
    event.target.parentElement.parentElement.appendChild(document.getElementById(blkdata)).setAttribute("id", "blk_Txt-" + newId);

    const blkTarget = event.target.parentElement.parentElement.id;
    const blkTargetId = document.getElementById(blkTarget);
    const blkTargetIdLength = blkTargetId.children.length;

    if (blkTargetIdLength != 1) {
      //DELETE closing tag if exist then create new one
      const delClose = event.target.parentElement.parentElement.lastChild.previousSibling;
      delClose.remove();
      const divClose = document.createElement("div");
      divClose.setAttribute("id", "blkClose-" + newId);
      divClose.setAttribute("class", "divClose");
      const divCloseChild = document.createElement("div");
      divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
      event.target.parentElement.parentElement.appendChild(divClose).setAttribute("title", "div-close");
    } else {
      //ADD closing div if not exist
      const divClose = document.createElement("div");
      divClose.setAttribute("id", "blkClose-" + newId);
      divClose.setAttribute("class", "divClose");
      const divCloseChild = document.createElement("div");
      divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
      event.target.parentElement.parentElement.appendChild(divClose).setAttribute("title", "div-close");
    }

  }

  if (btn2col) {
    const currentCol = document.getElementById(dropzone);
    currentCol.classList.remove("emptyCol");
    //ADD open div if not exist
    const colTarget = event.target.id;
    const colTargetId = document.getElementById(colTarget);
    const colTargetIdLength = colTargetId.children.length;

    if (colTargetIdLength == 1) {
      const divOpen = document.createElement("div");
      divOpen.setAttribute("id", "blkOpen-" + newId);
      divOpen.setAttribute("class", "divOpen");
      const divOpenChild = document.createElement("div");
      divOpen.appendChild(divOpenChild).setAttribute("id", "divOpenChild-" + newId)
      event.target.appendChild(divOpen).setAttribute("title", "div-open");
    }

    const node = document.getElementById(blkdata);
    const cloneBlk = node.cloneNode(true);
    document.getElementById("obj-btn").appendChild(cloneBlk);
    event.target.appendChild(document.getElementById(blkdata)).setAttribute("id", "blk_Btn-" + newId);

    if (colTargetIdLength != 1) {
      //DELETE closing tag if exist then create new one
      const delClose = event.target.lastChild.previousSibling;
      delClose.remove();
      const divClose = document.createElement("div");
      divClose.setAttribute("id", "blkClose-" + newId);
      divClose.setAttribute("class", "divClose");
      const divCloseChild = document.createElement("div");
      divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
      event.target.appendChild(divClose).setAttribute("title", "div-close");
    }
    else {
      //ADD closing div if not exist
      const divClose = document.createElement("div");
      divClose.setAttribute("id", "blkClose-" + newId);
      divClose.setAttribute("class", "divClose");
      const divCloseChild = document.createElement("div");
      divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
      event.target.appendChild(divClose).setAttribute("title", "div-close");
    }

  }

  if (btn2blk) {
    const node = document.getElementById(blkdata);
    const cloneBlk = node.cloneNode(true);
    document.getElementById("obj-btn").appendChild(cloneBlk);
    event.target.parentElement.parentElement.appendChild(document.getElementById(blkdata)).setAttribute("id", "blk_Btn-" + newId);
    const blkTarget = event.target.parentElement.parentElement.id;
    const blkTargetId = document.getElementById(blkTarget);
    const blkTargetIdLength = blkTargetId.children.length;

    if (blkTargetIdLength != 1) {
      //DELETE closing tag if exist then create new one
      const delClose = event.target.parentElement.parentElement.lastChild.previousSibling;
      delClose.remove();
      const divClose = document.createElement("div");
      divClose.setAttribute("id", "blkClose-" + newId);
      divClose.setAttribute("class", "divClose");
      const divCloseChild = document.createElement("div");
      divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
      event.target.parentElement.parentElement.appendChild(divClose).setAttribute("title", "div-close");
    } else {
      //ADD closing div if not exist
      const divClose = document.createElement("div");
      divClose.setAttribute("id", "blkClose-" + newId);
      divClose.setAttribute("class", "divClose");
      const divCloseChild = document.createElement("div");
      divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
      event.target.parentElement.parentElement.appendChild(divClose).setAttribute("title", "div-close");
    }
  }

  if (img2col) {
    const currentCol = document.getElementById(dropzone);
    currentCol.classList.remove("emptyCol");
    //ADD open div if not exist
    const colTarget = event.target.id;
    const colTargetId = document.getElementById(colTarget);
    const colTargetIdLength = colTargetId.children.length;

    if (colTargetIdLength == 1) {
      const divOpen = document.createElement("div");
      divOpen.setAttribute("id", "blkOpen-" + newId);
      divOpen.setAttribute("class", "divOpen");
      const divOpenChild = document.createElement("div");
      divOpen.appendChild(divOpenChild).setAttribute("id", "divOpenChild-" + newId)
      event.target.appendChild(divOpen).setAttribute("title", "div-open");
    }

    const node = document.getElementById(blkdata);
    const cloneBlk = node.cloneNode(true);
    document.getElementById("obj-img").appendChild(cloneBlk);
    event.target.appendChild(document.getElementById(blkdata)).setAttribute("id", "blk_Img-" + newId);

    if (colTargetIdLength != 1) {
      //DELETE closing tag if exist then create new one
      const delClose = event.target.lastChild.previousSibling;
      delClose.remove();
      const divClose = document.createElement("div");
      divClose.setAttribute("id", "blkClose-" + newId);
      divClose.setAttribute("class", "divClose");
      const divCloseChild = document.createElement("div");
      divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
      event.target.appendChild(divClose).setAttribute("title", "div-close");
    }
    else {
      //ADD closing div if not exist
      const divClose = document.createElement("div");
      divClose.setAttribute("id", "blkClose-" + newId);
      divClose.setAttribute("class", "divClose");
      const divCloseChild = document.createElement("div");
      divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
      event.target.appendChild(divClose).setAttribute("title", "div-close");
    }

  }

  if (img2blk) {
    const node = document.getElementById(blkdata);
    const cloneBlk = node.cloneNode(true);
    document.getElementById("obj-img").appendChild(cloneBlk);
    event.target.parentElement.parentElement.appendChild(document.getElementById(blkdata)).setAttribute("id", "blkImg-" + newId);

    const blkTarget = event.target.parentElement.parentElement.id;
    const blkTargetId = document.getElementById(blkTarget);
    const blkTargetIdLength = blkTargetId.children.length;

    if (blkTargetIdLength != 1) {
      //DELETE closing tag if exist then create new one
      const delClose = event.target.parentElement.parentElement.lastChild.previousSibling;
      delClose.remove();
      const divClose = document.createElement("div");
      divClose.setAttribute("id", "blkClose-" + newId);
      divClose.setAttribute("class", "divClose");
      const divCloseChild = document.createElement("div");
      divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
      event.target.parentElement.parentElement.appendChild(divClose).setAttribute("title", "div-close");
    } else {
      //ADD closing div if not exist
      const divClose = document.createElement("div");
      divClose.setAttribute("id", "blkClose-" + newId);
      divClose.setAttribute("class", "divClose");
      const divCloseChild = document.createElement("div");
      divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
      event.target.parentElement.parentElement.appendChild(divClose).setAttribute("title", "div-close");
    }
  }

  if (moveblk2col) {

    const currentCol = document.getElementById(dropzone);
    currentCol.classList.remove("emptyCol");

    //ADD open div if not exist
    const colTarget = event.target.id;
    const colTargetId = document.getElementById(colTarget);
    const colTargetIdLength = colTargetId.children.length;

    if (colTargetIdLength == 1) {
      const divOpen = document.createElement("div");
      divOpen.setAttribute("id", "blkOpen-" + newId);
      divOpen.setAttribute("class", "divOpen");
      event.target.appendChild(divOpen).setAttribute("title", "div-open");
    }

    //ADD block to target
    event.target.appendChild(document.getElementById(blkdata));

    if (colTargetIdLength != 1) {
      //DELETE closing tag if exist then create new one
      const delClose = event.target.lastChild.previousSibling;
      delClose.remove();
      const divClose = document.createElement("div");
      divClose.setAttribute("id", "blkClose-" + newId);
      divClose.setAttribute("class", "divClose");
      const divCloseChild = document.createElement("div");
      divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
      event.target.appendChild(divClose).setAttribute("title", "div-close");
    }
    else {
      //ADD closing div if not exist
      const divClose = document.createElement("div");
      divClose.setAttribute("id", "blkClose-" + newId);
      divClose.setAttribute("class", "divClose");
      const divCloseChild = document.createElement("div");
      divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
      event.target.appendChild(divClose).setAttribute("title", "div-close");
    }
  }

  if (moveblk2blk) {
    event.target.parentElement.parentElement.appendChild(document.getElementById(blkdata));

    const blkTarget = event.target.parentElement.parentElement.id;
    const blkTargetId = document.getElementById(blkTarget);
    const blkTargetIdLength = blkTargetId.children.length;

    if (blkTargetIdLength != 1) {
      //DELETE closing tag if exist then create new one
      const delClose = event.target.parentElement.parentElement.lastChild.previousSibling;
      delClose.remove();
      const divClose = document.createElement("div");
      divClose.setAttribute("id", "blkClose-" + newId);
      divClose.setAttribute("class", "divClose");
      event.target.parentElement.parentElement.appendChild(divClose).setAttribute("title", "div-close");
    } else {
      //ADD closing div if not exist
      const divClose = document.createElement("div");
      divClose.setAttribute("id", "blkClose-" + newId);
      divClose.setAttribute("class", "divClose");
      event.target.parentElement.parentElement.appendChild(divClose).setAttribute("title", "div-close");
    }
  }
}

// MAKE TEXT ELEMENT EDITABLE
document.querySelectorAll("#target .h2-title, #target .p-text, #target .a-btn").isContentEditable;


// DELETE ELEMENT
// function dropped(event) {
//   var data = event.dataTransfer.getData("id");
//   var el = document.getElementById(data);
//   let toDel = el.id;
//   const item = toDel.includes('-');
//   if (item == true) {
//     el.parentNode.removeChild(el);
//   }

//   event.target.style.color = '#dddddd';
//   event.target.style.fontSize = '2em';

//   const rows = document.querySelectorAll('.row');
//   rows.forEach(row => {
//     row.style.outline = "";
//   });

//   const columns = document.querySelectorAll('.column');
//   columns.forEach(column => {
//     column.style.outline = "";
//   });

// }

function dragEnd(event) {
  event.preventDefault();
}

function getJson() {
  const pageData = document.getElementById("target")
  document.getElementById("demo").innerHTML += pageData;
  console.log(pageData);
}

function viewGuide() {
  var pageView = document.getElementById("target");
  var guideBtn = document.getElementById("guide");
  pageView.classList.toggle("pageGuide");
  guideBtn.classList.toggle("guideBtn");
}


// GENERATE JSONDATA
function getData() {
  document.getElementById('savingText').innerHTML = 'Downloading JSON File';
  document.getElementById('loading').style.display = 'flex';
  document.getElementById('production').style.overflowY = 'hidden';

  setTimeout(function () {
    document.getElementById('savingText').innerHTML = 'Download Successful!';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('success').style.display = 'block';
  }, 1200);

  setTimeout(function () {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('spinner').style.display = 'block';
    document.getElementById('success').style.display = 'none';
    document.getElementById('production').style.overflowY = 'visible';
  }, 1800);

  const textEditor = document.getElementById('myText');
  const contEditor = document.getElementById('myContainer');
  const btnEditor = document.getElementById('myBtn');
  const imgEditor = document.getElementById('myImg');

  textEditor.style.animationName = "exit";
  contEditor.style.animationName = "exit";
  btnEditor.style.animationName = "exit";
  imgEditor.style.animationName = "exit";

  setTimeout(function () {
    textEditor.style.display = 'none';
    contEditor.style.display = 'none';
    btnEditor.style.display = 'none';
    imgEditor.style.display = 'none';
  }, 480);

  let text = "";
  text += '{"sections": { ';
  var elements = document.querySelectorAll("#target section");
  
  for (let i = 0; i < elements.length; i++) {
    const secId = elements[i].id;
    const secType = elements[i].title;
    const rows = elements[i].children;

    console.log(secId);
    text += JSON.stringify(secId) + ': { "type": ' + JSON.stringify(secType) + ', "blocks": { ';
    var blkOrder = "";
    var secCss = "";
    var rowCss = "";
    for (let j = 0; j < rows.length; j++) {
      const rowId = rows[j].id;
      const cols = rows[j].children;

      for (let k = 0; k < cols.length; k++) {
        const colId = cols[k].id;
        const blks = cols[k].children;
        if (colId != "") {
          console.log("   └──────  " + colId);
        }
        
        /* text += JSON.stringify(colId) + "<br>"; */

        for (let l = 0; l < blks.length; l++) {
          const blkIds = blks[l].id;
          const blkTypes = blks[l].title;

          const blkChild = blks[l].children;
          for (let m = 0; m < blkChild.length; m++) {
            const blkChildIds = blkChild[m].id;
            const blkChildStyle = blkChild[m].attributes.style;

            if (blkIds != "") {
                if (blkChildStyle == undefined) {
                  const blkCss = '';
                  const allBlks = JSON.stringify(blkIds) + ': { "type": ' + JSON.stringify(blkTypes) + ', "settings": {' + blkCss + '}}, '
                  text += allBlks;
                } else {
                  const blkCss = '"' + blkChildStyle.value.replaceAll(': ', '": "').replaceAll('; ', '", "').replace(';', '"');
                  const allBlks = JSON.stringify(blkIds) + ': { "type": ' + JSON.stringify(blkTypes) + ', "settings": {' + blkCss + '}}, '
                  text += allBlks;
                }
            }

          }
          if (blkIds != "") {
            console.log("        └──────  " + blkIds);
            blkOrder += JSON.stringify(blkIds) + " ";
          }
        }
      }
    
      const rowIdExist = rowId.includes('row-');
      if (rowIdExist == true) {
        const rowStyle = rows[j].attributes.style.value;
  
        if (rowStyle == "") {
            rowCss += '';
        } else {
          rowCss += '"row-' + rowStyle.replaceAll(': ', '": "').replaceAll('; ', '", "row-').replace(';', '"');
        }
      }
    }

    const secStyle = elements[i].attributes.style;

    if (secStyle == undefined) {
      secCss += '';
    } else if (secStyle.value == "") {
      secCss += '';
    } else {
      secCss += '"sec-' + secStyle.value.replaceAll(': ', '": "').replaceAll('; ', '", "sec-').replace(';', '"');
    }


    if (secCss.length == 0 && rowCss.length == 0) {
      text += '}, "block_order": [ ' + blkOrder + ' ], "settings": {} },';
    } 

    if (secCss.length > 0 && rowCss.length == 0) {
      text += '}, "block_order": [ ' + blkOrder + ' ], "settings": {' + secCss + '} },';
    } 

    if (secCss.length == 0 && rowCss.length > 0) {
      text += '}, "block_order": [ ' + blkOrder + ' ], "settings": {' + rowCss + '} },';
    }

    if (secCss.length > 0 && rowCss.length > 0) {
      text += '}, "block_order": [ ' + blkOrder + ' ], "settings": {' + secCss + ', ' + rowCss + '} },';
    } 

    console.log(" ");
  }

  var sectionOrder = "";
  const allSections = document.querySelectorAll("#target section");
  for (var i = 0; i < allSections.length; i++) {
    const section = JSON.stringify(allSections[i].id);
    const sections = section + ", ";
    if ((i + 1) == (allSections.length)) {
      sectionOrder += sections.replace(', ', '');
    } else {
      sectionOrder += sections;
    }
  }

  text += ' }, "order": [' + sectionOrder + '] }';
  const jsonData = text.replaceAll("}, },", "} },").replaceAll('" "', '", "').replaceAll('url("', 'url(').replaceAll('")', ')');
  document.getElementById("printJson").innerHTML = jsonData;

  const jsonObject = document.getElementById("printJson").innerHTML;
  const objParse = JSON.parse(jsonObject)
  const objString = JSON.stringify(objParse, null, 2);


  function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  function onDownload() {
    download(objString, "json-template.json", "text/plain");
  }

  setTimeout(function () {
    return onDownload()
  }, 1000);
}

function rgb2hex(rgb){
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? "#" +
   ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
   ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
   ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
 }


// TEXT EDITOR
var saveTxt = document.getElementById("saveTxt");
var dupTxt = document.getElementById("dupTxt");
var delTxt = document.getElementById("delTxt");
var editTxt = document.getElementById('myText');
var txtColorPickerTxt = document.getElementById('txtColorPicker');
var txtColorInputTxt = document.getElementById('txtColor');
var closTxt = editTxt.getElementsByClassName('close')[0];

function openForm(event) {
  event.stopPropagation();
  document.getElementById("myText").style.display = "block";

  let text = event.target.parentElement.parentElement.previousElementSibling.className;
  const textEditor = text.includes('text');
  editTxt.style.animationName = "show";

  if (textEditor == true) {
    const contEditor = document.getElementById('myContainer');
    const btnEditor = document.getElementById('myBtn');
    const imgEditor = document.getElementById('myImg');
    contEditor.style.display = 'none';
    btnEditor.style.display = 'none';
    imgEditor.style.display = 'none';
  } else {
    const textEditor = document.getElementById('myText');
    const contEditor = document.getElementById('myContainer');
    const btnEditor = document.getElementById('myBtn');
    const imgEditor = document.getElementById('myImg');
    textEditor.style.display = 'none';
    contEditor.style.display = 'none';
    btnEditor.style.display = 'none';
    imgEditor.style.display = 'none';
  }

  const getParentId = event.target.parentElement.parentElement.parentElement.id;
  const getId = event.target.id;
  document.getElementById("mTitle").innerHTML = getParentId;

  dupTxt.onclick = function () {
    const node = document.getElementById(getParentId);
    const cloneCol = node.cloneNode(true);
    const splitId = getParentId.split("-");
    const newId = Math.floor(Math.random() * Date.now());
    const dupId = splitId[0] + "-" + newId;
    event.target.parentElement.parentElement.parentElement.parentElement.appendChild(cloneCol).setAttribute("id", dupId);
    const parentDiv = node.parentElement;
    const lastElemChild = parentDiv.lastElementChild;
    const delClose = lastElemChild.previousElementSibling;
    delClose.remove();
    const divClose = document.createElement("div");
    divClose.setAttribute("id", "blkClose-" + newId);
    divClose.setAttribute("class", "divClose");
    const divCloseChild = document.createElement("div");
    divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
    event.target.parentElement.parentElement.parentElement.parentElement.appendChild(divClose).setAttribute("title", "div-close");
}

  delTxt.onclick = function () {
      var el = document.getElementById(getParentId);
      el.parentNode.removeChild(el);
  }

  const initialEntry = document.getElementById(getParentId).firstElementChild;
  var setfSize = initialEntry.style.fontSize;
  var setlHeight = initialEntry.style.lineHeight;
  var setlSpacing = initialEntry.style.letterSpacing;
  var settxtColor = initialEntry.style.color;
  var setfWeight = initialEntry.style.fontWeight;
  var settAlign = initialEntry.style.textAlign;
  const txtColorValue = settxtColor.includes('rgb');

  document.getElementById("fSize").value = setfSize;
  document.getElementById("lHeight").value = setlHeight;
  document.getElementById("lSpacing").value = setlSpacing;
  document.getElementById("txtColor").value = rgb2hex(settxtColor);
  if (txtColorValue == true) {
    document.getElementById("txtColorPicker").value = rgb2hex(settxtColor);
  } else {
    document.getElementById("txtColorPicker").value = '#000000';
  }
  document.getElementById("fWeight").value = setfWeight;
  document.getElementById("tAlign").value = settAlign;

  saveTxt.onclick = function () {
    var fSize = document.getElementById("fSize").value;
    var lHeight = document.getElementById("lHeight").value;
    var lSpacing = document.getElementById("lSpacing").value;
    var txtColor = document.getElementById("txtColor").value;
    var fWeight = document.getElementById("fWeight").value;
    var tAlign = document.getElementById("tAlign").value;

    const textInput = document.getElementById(getParentId).firstElementChild;

    textInput.style.fontSize = fSize;
    textInput.style.lineHeight = lHeight;
    textInput.style.letterSpacing = lSpacing;
    textInput.style.color = txtColor;
    textInput.style.fontWeight = fWeight;
    textInput.style.textAlign = tAlign;

    editTxt.style.animationName = "exit";
    setTimeout(() => {
      editTxt.style.display = "none";
    }, 480);

  }

  txtColorPickerTxt.onchange = function () {
    document.getElementById("txtColor").value = document.getElementById("txtColorPicker").value;
  }

  txtColorInputTxt.onchange = function () {
      document.getElementById("txtColorPicker").value = document.getElementById("txtColor").value;
  }

  closTxt.onclick = function () {

    editTxt.style.animationName = "exit";
    setTimeout(() => {
      editTxt.style.display = "none";
    }, 480);

  };
}

// CONTAINER EDITOR

var saveCont = document.getElementById("saveCont");
var dupCont = document.getElementById("dupCont");
var delCont = document.getElementById("delCont");
var editCont = document.getElementById('myContainer');
var imgInputUrl = document.getElementById('bgUrl');
var delBgImg = document.getElementById("delBgImg");
var bColorPickerCont = document.getElementById('bColorPicker');
var bColorInputCont = document.getElementById('bColor');
var bgColorPickerCont = document.getElementById('bgColorPicker');
var bgColorInputCont = document.getElementById('bgColor');
var closeCont = editCont.getElementsByClassName('close')[0];

function openContForm(event) {

  const getChildren = event.target.parentElement.parentElement.parentElement.children;
  const childrenLength = getChildren.length;
  if (childrenLength > 1) {
    document.getElementById("myContainer").style.display = "block";
  }
  let cont = event.target.parentElement.parentElement.parentElement.className;
  const contEditor = cont.includes('cont');
  editCont.style.animationName = "show";

  if (contEditor == true) {
    const textEditor = document.getElementById('myText');
    const btnEditor = document.getElementById('myBtn');
    const imgEditor = document.getElementById('myImg');
    textEditor.style.display = 'none';
    btnEditor.style.display = 'none';
    imgEditor.style.display = 'none';
  } else {
    const textEditor = document.getElementById('myText');
    const contEditor = document.getElementById('myContainer');
    const btnEditor = document.getElementById('myBtn');
    const imgEditor = document.getElementById('myImg');
    textEditor.style.display = 'none';
    contEditor.style.display = 'none';
    btnEditor.style.display = 'none';
    imgEditor.style.display = 'none';
  }

  let contOff = event.target.parentElement.parentElement.parentElement.id;
  const contSecEditorOff = contOff.includes('-');
  if (contSecEditorOff == false) {
    const textEditor = document.getElementById('myText');
    const contEditor = document.getElementById('myContainer');
    const btnEditor = document.getElementById('myBtn');
    textEditor.style.display = 'none';
    contEditor.style.display = 'none';
    btnEditor.style.display = 'none';
  }

  const getContId = event.target.parentElement.parentElement.parentElement.id;
  document.getElementById("cTitle").innerHTML = getContId;
  const secCont = getContId.includes('section-');
  const rowCont = getContId.includes('row-');
  const colCont = getContId.includes('column-');
  const contChild = event.target.parentElement.parentElement.parentElement.children;

  if (rowCont == true) {
    document.getElementById("dupCont").classList.add('disabled');
    document.getElementById("delCont").classList.add('disabled');
  } else {
    document.getElementById("dupCont").classList.remove('disabled');
    document.getElementById("delCont").classList.remove('disabled');
  }

  dupCont.onclick = function () {
    if (rowCont == false) {
      const node = document.getElementById(getContId);
      const cloneCol = node.cloneNode(true);
      const splitId = getContId.split("-");
      const newId = Math.floor(Math.random() * Date.now());
      const dupId = splitId[0] + "-" + newId;
      if (secCont == true) {
        for (var i = 0; i < contChild.length; i++) {
          const contChildId = contChild[i].attributes.id;

          if (contChildId != undefined) {
            const contChildIdValue = contChild[i].attributes.id.value;
            const contChildClassValue = contChild[i].attributes.class.value;
            const splitChildId = contChildIdValue.split("-");
            const dupChildId = splitChildId[0] + "-" + newId + i;
            contChild[i].setAttribute("id", dupChildId);
            const contGrandChild = contChild[i].children;

            for (var j = 0; j < contGrandChild.length; j++) {
              const contGrandChildId = contGrandChild[j].id;

              if (contGrandChildId != "") {
                const splitGrandChildId = contGrandChildId.split("-");
                const dupGrandChildId = splitGrandChildId[0] + "-" + newId + j;
                contGrandChild[j].setAttribute("id", dupGrandChildId);
                const contGreatGrandChild = contGrandChild[j].children;

                for (var k = 0; k < contGreatGrandChild.length; k++) {
                  const contGreatGrandChildId = contGreatGrandChild[k].id;

                  if (contGreatGrandChildId != "") {
                    const splitGreatGrandChildId = contGreatGrandChildId.split("-");
                    const dupGreatGrandChildId = splitGreatGrandChildId[0] + "-" + newId + j + k;
                    const contGreat2xGrandChild = contGreatGrandChild[k].children;
                    contGreatGrandChild[k].setAttribute("id", dupGreatGrandChildId);
                    for (var l = 0; l < contGreat2xGrandChild.length; l++) {
                      const contGreat2xGrandChildId = contGreat2xGrandChild[l].id;
                      const getDivOpenChildId = contGreat2xGrandChildId.includes('divOpenChild-');
                      const getDivCloseChildId = contGreat2xGrandChildId.includes('divCloseChild-');

                      if (getDivOpenChildId == true || getDivCloseChildId == true) {
                        const splitDivChildId = contGreat2xGrandChildId.split("-");
                        const dupDivChildId = splitDivChildId[0] + "-" + newId + (j + k + l + 1);
                        contGreat2xGrandChild[l].setAttribute("id", dupDivChildId);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (colCont == true) {
        for (var i = 0; i < contChild.length; i++) {
          const contChildId = contChild[i].attributes.id;
          if (contChildId != undefined) {
            const contChildIdValue = contChild[i].attributes.id.value;
            const splitChildId = contChildIdValue.split("-");
            const dupChildId = splitChildId[0] + "-" + newId + i;
            const contGrandChild = contChild[i].children;
            contChild[i].setAttribute("id", dupChildId);
            for (var j = 0; j < contGrandChild.length; j++) {
              const contGrandChildId = contGrandChild[j].id;
              if (contGrandChildId != "") {
                const getDivOpenChildId = contGrandChildId.includes('divOpenChild-');
                const getDivCloseChildId = contGrandChildId.includes('divCloseChild-');
                if (getDivOpenChildId == true || getDivCloseChildId == true) {
                  const splitDivChildId = contGrandChildId.split("-");
                  const dupDivChildId = splitDivChildId[0] + "-" + newId + (j + 1);
                  contGrandChild[j].setAttribute("id", dupDivChildId);
                }
              }
            }
          }
        }
      }
      event.target.parentElement.parentElement.parentElement.parentElement.appendChild(cloneCol).setAttribute("id", dupId);
    }
  }



  delCont.onclick = function () {
    if (rowCont == false) {
      var el = document.getElementById(getContId);
      el.parentNode.removeChild(el);
    }
  }

  var imgSrc = "";
  uploadImg.onchange = (event) => {
    const image = document.getElementById('bgOutput');
    const bgDefault = document.getElementById('bgDefault');
    const src = URL.createObjectURL(event.target.files[0]);
    imgSrc += "url(" + src + ")";
    image.style.backgroundImage = imgSrc;
    document.getElementById('bgUrl').value = imgSrc;
  };
 
 imgInputUrl.onchange = () => {
    const image = document.getElementById('bgOutput');
    const imgUrl = document.getElementById('bgUrl').value;
    image.style.backgroundImage = imgUrl;
  }
  delBgImg.onchange = () => {
    const image = document.getElementById('bgOutput');
    const imgUrl = document.getElementById('bgUrl').value;
    image.style.backgroundImage = imgUrl;
    document.getElementById("delBgImg").checked = false;
  }

  // delBgImg.onchange = function () {
  //   document.getElementById('bgUrl').value = null;
  // }

  const initialEntry = document.getElementById(getContId);
  var settopPadding = initialEntry.style.paddingTop;
  var setbottomPadding = initialEntry.style.paddingBottom;
  var setleftPadding = initialEntry.style.paddingLeft;
  var setrightPadding = initialEntry.style.paddingRight;
  var setmarginTop = initialEntry.style.marginTop
  var setmarginBottom = initialEntry.style.marginBottom
  var setmarginLeft = initialEntry.style.marginLeft
  var setmarginRight = initialEntry.style.marginRight
  var setBorderTopWidth = initialEntry.style.borderTopWidth;
  var setBorderRightWidth = initialEntry.style.borderRightWidth;
  var setBorderBottomWidth = initialEntry.style.borderBottomWidth;
  var setBorderLeftWidth = initialEntry.style.borderLeftWidth;
  var setBorderStyle = initialEntry.style.borderStyle;
  var setBorderColor = initialEntry.style.borderColor;
  var setBorderTopLeftRadius = initialEntry.style.borderTopLeftRadius;
  var setBorderTopRightRadius = initialEntry.style.borderTopRightRadius;
  var setBorderBottomLeftRadius = initialEntry.style.borderBottomLeftRadius;
  var setBorderBottomRightRadius = initialEntry.style.borderBottomRightRadius;
  var setwidth = initialEntry.style.width;
  var setmaxWidth = initialEntry.style.maxWidth;
  var setminHeight = initialEntry.style.minHeight;
  var setbgColor = initialEntry.style.backgroundColor;
  var setcolumnGap = initialEntry.style.columnGap;
  var setrowGap = initialEntry.style.rowGap;
  var setflexDirection = initialEntry.style.flexDirection;
  var setalignContent = initialEntry.style.alignContent;
  var setjustifyContent = initialEntry.style.justifyContent;
  var setalignItems = initialEntry.style.alignItems;
  var setImgPreview = initialEntry.style.backgroundImage;
  var setImgSrc = initialEntry.style.backgroundImage;
  var setBgSize = initialEntry.style.backgroundSize;
  var setBgPosition = initialEntry.style.backgroundPosition;
  var setBgRepeat = initialEntry.style.backgroundRepeat;

  const bColorValue = setBorderColor.includes('rgb');
  const bgColorValue = setbgColor.includes('rgb');

  document.getElementById("pTop").value = settopPadding;
  document.getElementById("pBottom").value = setbottomPadding;
  document.getElementById("pLeft").value = setleftPadding;
  document.getElementById("pRight").value = setrightPadding;
  document.getElementById("mTop").value = setmarginTop;
  document.getElementById("mBottom").value = setmarginBottom;
  document.getElementById("mLeft").value = setmarginLeft;
  document.getElementById("mRight").value = setmarginRight;
  document.getElementById("bTopWidth").value = setBorderTopWidth;
  document.getElementById("bRightWidth").value = setBorderRightWidth;
  document.getElementById("bBottomWidth").value = setBorderBottomWidth;
  document.getElementById("bLeftWidth").value = setBorderLeftWidth;
  document.getElementById("bStyle").value = setBorderStyle;
  document.getElementById("bColor").value = rgb2hex(setBorderColor);
  if (bColorValue == true) {
    document.getElementById("bColorPicker").value = rgb2hex(setBorderColor);
  } else {
    document.getElementById("bColorPicker").value = '#000000';
  }
  document.getElementById("bTopLeftRadius").value = setBorderTopLeftRadius;
  document.getElementById("bTopRightRadius").value = setBorderTopRightRadius;
  document.getElementById("bBottomLeftRadius").value = setBorderBottomLeftRadius;
  document.getElementById("bBottomRightRadius").value = setBorderBottomRightRadius;
  document.getElementById("width").value = setwidth;
  document.getElementById("mWidth").value = setmaxWidth;
  document.getElementById("mHeight").value = setminHeight;
  document.getElementById("bgColor").value = rgb2hex(setbgColor);
  if (bgColorValue == true) {
    document.getElementById("bgColorPicker").value = rgb2hex(setbgColor);
  } else {
    document.getElementById("bgColorPicker").value = '#000000';
  }
  document.getElementById("cGap").value = setcolumnGap;
  document.getElementById("rGap").value = setrowGap;
  document.getElementById("fDirect").value = setflexDirection;
  document.getElementById("aContent").value = setalignContent;
  document.getElementById("jContent").value = setjustifyContent;
  document.getElementById("aItems").value = setalignItems;
  document.getElementById("bgUrl").value = setImgSrc;
  document.getElementById("bgOutput").style.backgroundImage = setImgPreview;
  document.getElementById("bgSize").value = setBgSize;
  document.getElementById("bgPosition").value = setBgPosition;
  document.getElementById("bgRepeat").value = setBgRepeat;

  saveCont.onclick = function () {
    var pTop = document.getElementById("pTop").value;
    var pBottom = document.getElementById("pBottom").value;
    var pLeft = document.getElementById("pLeft").value;
    var pRight = document.getElementById("pRight").value;
    var mTop = document.getElementById("mTop").value;
    var mBottom = document.getElementById("mBottom").value;
    var mLeft = document.getElementById("mLeft").value;
    var mRight = document.getElementById("mRight").value;
    var bTopWidth = document.getElementById("bTopWidth").value;
    var bRightWidth = document.getElementById("bRightWidth").value;
    var bBottomWidth = document.getElementById("bBottomWidth").value;
    var bLeftWidth = document.getElementById("bLeftWidth").value;
    var bStyle = document.getElementById("bStyle").value;
    var bColor = document.getElementById("bColor").value;
    var bTopLeftRadius = document.getElementById("bTopLeftRadius").value;
    var bTopRightRadius = document.getElementById("bTopRightRadius").value;
    var bBottomRightRadius = document.getElementById("bBottomRightRadius").value;
    var bBottomLeftRadius = document.getElementById("bBottomLeftRadius").value;
    var width = document.getElementById("width").value;
    var mWidth = document.getElementById("mWidth").value;
    var mHeight = document.getElementById("mHeight").value;
    var bgColor = document.getElementById("bgColor").value;
    var cGap = document.getElementById("cGap").value;
    var rGap = document.getElementById("rGap").value;
    var fDirect = document.getElementById("fDirect").value;
    var aContent = document.getElementById("aContent").value;
    var jContent = document.getElementById("jContent").value;
    var aItems = document.getElementById("aItems").value;
    var bgUrl = document.getElementById("bgUrl").value;
    var bgSize = document.getElementById("bgSize").value;
    var bgPosition = document.getElementById("bgPosition").value;
    var bgRepeat = document.getElementById("bgRepeat").value;

    const selectedContainer = document.getElementById(getContId);

    selectedContainer.style.paddingTop = pTop;
    selectedContainer.style.paddingBottom = pBottom;
    selectedContainer.style.paddingLeft = pLeft;
    selectedContainer.style.paddingRight = pRight;
    selectedContainer.style.marginTop = mTop;
    selectedContainer.style.marginBottom = mBottom;
    selectedContainer.style.marginLeft = mLeft;
    selectedContainer.style.marginRight = mRight;
    selectedContainer.style.borderTopWidth = bTopWidth;
    selectedContainer.style.borderRightWidth = bRightWidth;
    selectedContainer.style.borderBottomWidth = bBottomWidth;
    selectedContainer.style.borderLeftWidth = bLeftWidth;
    selectedContainer.style.borderStyle = bStyle;
    selectedContainer.style.borderColor = bColor;
    selectedContainer.style.borderTopLeftRadius = bTopLeftRadius;
    selectedContainer.style.borderTopRightRadius = bTopRightRadius;
    selectedContainer.style.borderBottomRightRadius = bBottomRightRadius;
    selectedContainer.style.borderBottomLeftRadius = bBottomLeftRadius;
    selectedContainer.style.width = width;
    selectedContainer.style.maxWidth = mWidth;
    selectedContainer.style.minHeight = mHeight;
    selectedContainer.style.backgroundColor = bgColor;
    selectedContainer.style.columnGap = cGap;
    selectedContainer.style.rowGap = rGap;
    selectedContainer.style.flexDirection = fDirect;
    selectedContainer.style.alignContent = aContent;
    selectedContainer.style.justifyContent = jContent;
    selectedContainer.style.alignItems = aItems;
    selectedContainer.style.backgroundImage = bgUrl;
    selectedContainer.style.backgroundSize = bgSize;
    selectedContainer.style.backgroundPosition = bgPosition;
    selectedContainer.style.backgroundRepeat = bgRepeat;


    // MANAGE DIRECTIONAL ICONS
    if (rowCont == true) {
      const rowDirect = selectedContainer.style.flexDirection;
      const rowChildren = selectedContainer.children;
      const fDirectCol = rowDirect.includes('column');
      if (fDirectCol == true) {
        for (var i = 0; i < rowChildren.length; i++) {
          const rowChildId = rowChildren[i].id;
          const colElem = rowChildId.includes('column-');
          if (colElem == true) {
            const colElem = rowChildren[i].firstElementChild;
            const colElemChild = colElem.children;
            for (var j = 0; j < colElemChild.length; j++) {
              const colElemGrandChild = colElemChild[j].children;
              for (var k = 0; k < colElemGrandChild.length; k++) {
                const colElemGreatGrandChild = colElemGrandChild[k];
                const childClass = colElemGrandChild[k].attributes.class;
                if (childClass) {
                  const childClassValue = colElemGrandChild[k].attributes.class.value;
                  const directBtnLeft = childClassValue.includes('fa-chevron-left');
                  const directBtnRight = childClassValue.includes('fa-chevron-right');
                  if (directBtnLeft == true) {
                    colElemGreatGrandChild.classList.add('up');
                  }
                  if (directBtnRight == true) {
                    colElemGreatGrandChild.classList.add('down');
                  }
                }
              }
            }
          }
        }
      } else {
          for (var i = 0; i < rowChildren.length; i++) {
            const rowChildId = rowChildren[i].id;
            const colElem = rowChildId.includes('column-');
            if (colElem == true) {
              const colElem = rowChildren[i].firstElementChild;
              const colElemChild = colElem.children;
              for (var j = 0; j < colElemChild.length; j++) {
                const colElemGrandChild = colElemChild[j].children;
                for (var k = 0; k < colElemGrandChild.length; k++) {
                  const colElemGreatGrandChild = colElemGrandChild[k];
                  const childClass = colElemGrandChild[k].attributes.class;
                  if (childClass) {
                    const childClassValue = colElemGrandChild[k].attributes.class.value;
                    const directBtnLeft = childClassValue.includes('fa-chevron-left');
                    const directBtnRight = childClassValue.includes('fa-chevron-right');
                    if (directBtnLeft == true) {
                      colElemGreatGrandChild.classList.remove('up');
                    }
                    if (directBtnRight == true) {
                      colElemGreatGrandChild.classList.remove('down');
                    }
                  }
                }
              }
            }
          }
      }
    }

    if (colCont == true) {
      const colDirect = selectedContainer.style.flexDirection;
      const colChildren = selectedContainer.children;
      const fDirectCol = colDirect.includes('row');
      if (fDirectCol == true) {
        for (var i = 0; i < colChildren.length; i++) {
          const colChildId = colChildren[i].id;
          const getBlks = colChildId.includes('blk_');
          if (getBlks == true) {
            const blkChildren = colChildren[i].children;
            for (var j = 0; j < blkChildren.length; j++) {
              const blkGrandChild = blkChildren[j].lastElementChild;
              if (blkGrandChild != null) {
                const blkGreatGrandChild = blkGrandChild.children;
                for (var k = 0; k < blkGreatGrandChild.length; k++) {
                  const childClassValue = blkGreatGrandChild[k].attributes.class.value;
                  const directBtnUp = childClassValue.includes('fa-chevron-up');
                  const directBtnDown = childClassValue.includes('fa-chevron-down');
                  if (directBtnUp == true) {
                    const up2left = blkGreatGrandChild[k];
                    up2left.classList.add('left');
                  }
                  if (directBtnDown == true) {
                    const up2right = blkGreatGrandChild[k];
                    up2right.classList.add('right');
                  }
                }
              }
            }
          }
        }
      } else {
        for (var i = 0; i < colChildren.length; i++) {
          const colChildId = colChildren[i].id;
          const getBlks = colChildId.includes('blk_');
          if (getBlks == true) {
            const blkChildren = colChildren[i].children;
            for (var j = 0; j < blkChildren.length; j++) {
              const blkGrandChild = blkChildren[j].lastElementChild;
              if (blkGrandChild != null) {
                const blkGreatGrandChild = blkGrandChild.children;
                for (var k = 0; k < blkGreatGrandChild.length; k++) {
                  const childClassValue = blkGreatGrandChild[k].attributes.class.value;
                  const directBtnUp = childClassValue.includes('fa-chevron-up');
                  const directBtnDown = childClassValue.includes('fa-chevron-down');
                  if (directBtnUp == true) {
                    const up2left = blkGreatGrandChild[k];
                    up2left.classList.remove('left');
                  }
                  if (directBtnDown == true) {
                    const up2right = blkGreatGrandChild[k];
                    up2right.classList.remove('right');
                  }
                }
              }
            }
          }
        }
      }
    }

    editCont.style.animationName = "exit";
    setTimeout(() => {
      editCont.style.display = "none";
    }, 480);
  

    let colSelect = event.target.id;
    const colOnly = colSelect.includes('column-');

    if (colOnly == true) {

      const getChild = event.target.firstElementChild.id;
      const selectedDivOpen = document.getElementById(getChild);
      let divOpenChild = selectedDivOpen.firstElementChild.id;
      const divOpen = divOpenChild.includes("divOpenChild-")
  
      if (divOpen == true) {
        const selectedDivOpen = document.getElementById(divOpenChild);
        selectedDivOpen.style.paddingTop = pTop;
        selectedDivOpen.style.paddingBottom = pBottom;
        selectedDivOpen.style.paddingLeft = pLeft;
        selectedDivOpen.style.paddingRight = pRight;
        selectedDivOpen.style.marginTop = mTop;
        selectedDivOpen.style.marginBottom = mBottom;
        selectedDivOpen.style.marginLeft = mLeft;
        selectedDivOpen.style.marginRight = mRight;
        selectedDivOpen.style.borderTopWidth = bTopWidth;
        selectedDivOpen.style.borderRightWidth = bRightWidth;
        selectedDivOpen.style.borderBottomWidth = bBottomWidth;
        selectedDivOpen.style.borderLeftWidth = bLeftWidth;
        selectedDivOpen.style.borderStyle = bStyle;
        selectedDivOpen.style.borderColor = bColor;
        selectedDivOpen.style.borderTopLeftRadius = bTopLeftRadius;
        selectedDivOpen.style.borderTopRightRadius = bTopRightRadius;
        selectedDivOpen.style.borderBottomRightRadius = bBottomRightRadius;
        selectedDivOpen.style.borderBottomLeftRadius = bBottomLeftRadius;
        selectedDivOpen.style.width = width;
        selectedDivOpen.style.maxWidth = mWidth;
        selectedDivOpen.style.minHeight = mHeight;
        selectedDivOpen.style.backgroundColor = bgColor;
        selectedDivOpen.style.columnGap = cGap;
        selectedDivOpen.style.rowGap = rGap;
        selectedDivOpen.style.flexDirection = fDirect;
        selectedDivOpen.style.alignContent = aContent;
        selectedDivOpen.style.justifyContent = jContent;
        selectedDivOpen.style.alignItems = aItems;
        selectedDivOpen.style.backgroundImage = bgUrl;
        selectedDivOpen.style.backgroundSize = bgSize;
        selectedDivOpen.style.backgroundPosition = bgPosition;
        selectedDivOpen.style.backgroundRepeat = bgRepeat;
      }

    }

  }

  bColorPickerCont.onchange = function () {
    document.getElementById("bColor").value = document.getElementById("bColorPicker").value;
  }

  bColorInputCont.onchange = function () {
      document.getElementById("bColorPicker").value = document.getElementById("bColor").value;
  }

  bgColorPickerCont.onchange = function () {
    document.getElementById("bgColor").value = document.getElementById("bgColorPicker").value;
  }

  bgColorInputCont.onchange = function () {
      document.getElementById("bgColorPicker").value = document.getElementById("bgColor").value;
  }
  
  closeCont.onclick = function () {
    editCont.style.animationName = "exit";
    setTimeout(() => {
      editCont.style.display = "none";
    }, 480);
  };
}

// BUTTON EDITOR
var saveBtn = document.getElementById("saveBtn");
var delBtn = document.getElementById("delBtn");
var editBtn = document.getElementById('myBtn');
var bColorPickerBtn = document.getElementById('bColorPickerBtn');
var bColorInputBtn = document.getElementById('bColorBtn');
var txtColorPickerBtn = document.getElementById('txtColorPickerBtn');
var txtColorInputBtn = document.getElementById('txtColorBtn');
var bgColorPickerBtn = document.getElementById('bgColorPickerBtn');
var bgColorInputBtn = document.getElementById('bgColorBtn');
var closeBtn = editBtn.getElementsByClassName('close')[0];

function openBtnForm(event) {
  event.stopPropagation();
  document.getElementById("myBtn").style.display = "block";

  let btn = event.target.parentElement.parentElement.previousElementSibling.className;
  const btnEditor = btn.includes('btn');
  editBtn.style.animationName = "show";

  if (btnEditor == true) {
    const textEditor = document.getElementById('myText');
    const contEditor = document.getElementById('myContainer');
    const imgEditor = document.getElementById('myImg');
    textEditor.style.display = 'none';
    contEditor.style.display = 'none';
    imgEditor.style.display = 'none';
  } else {
    const textEditor = document.getElementById('myText');
    const contEditor = document.getElementById('myContainer');
    const btnEditor = document.getElementById('myBtn');
    const imgEditor = document.getElementById('myImg');
    textEditor.style.display = 'none';
    contEditor.style.display = 'none';
    btnEditor.style.display = 'none';
    imgEditor.style.display = 'none';
  }

  const getBtnParentId = event.target.parentElement.parentElement.parentElement.id;
  document.getElementById("bTitle").innerHTML = getBtnParentId;

  dupBtn.onclick = function () {
    const node = document.getElementById(getBtnParentId);
    const cloneCol = node.cloneNode(true);
    const splitId = getBtnParentId.split("-");
    const newId = Math.floor(Math.random() * Date.now());
    const dupId = splitId[0] + "-" + newId;
    event.target.parentElement.parentElement.parentElement.parentElement.appendChild(cloneCol).setAttribute("id", dupId);
    const parentDiv = node.parentElement;
    const lastElemChild = parentDiv.lastElementChild;
    const delClose = lastElemChild.previousElementSibling;
    delClose.remove();
    const divClose = document.createElement("div");
    divClose.setAttribute("id", "blkClose-" + newId);
    divClose.setAttribute("class", "divClose");
    const divCloseChild = document.createElement("div");
    divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
    event.target.parentElement.parentElement.parentElement.parentElement.appendChild(divClose).setAttribute("title", "div-close");
}


  delBtn.onclick = function () {
    var el = document.getElementById(getBtnParentId);
    el.parentNode.removeChild(el);
}

  const initialEntry = document.getElementById(getBtnParentId).firstElementChild;
  const initialEntry2 = document.getElementById(getBtnParentId);
  var settopPadding = initialEntry.style.paddingTop;
  var setbottomPadding = initialEntry.style.paddingBottom;
  var setleftPadding = initialEntry.style.paddingLeft;
  var setrightPadding = initialEntry.style.paddingRight;
  var setmarginTop = initialEntry.style.marginTop
  var setmarginBottom = initialEntry.style.marginBottom
  var setmarginLeft = initialEntry.style.marginLeft
  var setmarginRight = initialEntry.style.marginRight
  var setBorderTopWidth = initialEntry.style.borderTopWidth;
  var setBorderRightWidth = initialEntry.style.borderRightWidth;
  var setBorderBottomWidth = initialEntry.style.borderBottomWidth;
  var setBorderLeftWidth = initialEntry.style.borderLeftWidth;
  var setBorderStyle = initialEntry.style.borderStyle;
  var setBorderColor = initialEntry.style.borderColor;
  var setBorderTopLeftRadius = initialEntry.style.borderTopLeftRadius;
  var setBorderTopRightRadius = initialEntry.style.borderTopRightRadius;
  var setBorderBottomLeftRadius = initialEntry.style.borderBottomLeftRadius;
  var setBorderBottomRightRadius = initialEntry.style.borderBottomRightRadius;
  var setfSize = initialEntry.style.fontSize;
  var setfWeight = initialEntry.style.fontWeight;
  var settAlign = initialEntry2.style.textAlign;
  var setwidth = initialEntry.style.width;
  var setmaxWidth = initialEntry.style.maxWidth;
  var setminHeight = initialEntry.style.minHeight;
  var settxtColor = initialEntry.style.color;
  var setbgColor = initialEntry.style.backgroundColor;

  const bColorValue = setBorderColor.includes('rgb'); 
  const txtColorValue = settxtColor.includes('rgb'); 
  const bgColorValue = setbgColor.includes('rgb'); 

  document.getElementById("pTopBtn").value = settopPadding;
  document.getElementById("pBottomBtn").value = setbottomPadding;
  document.getElementById("pLeftBtn").value = setleftPadding;
  document.getElementById("pRightBtn").value = setrightPadding;
  document.getElementById("mTopBtn").value = setmarginTop;
  document.getElementById("mBottomBtn").value = setmarginBottom;
  document.getElementById("mLeftBtn").value = setmarginLeft;
  document.getElementById("mRightBtn").value = setmarginRight;
  document.getElementById("bTopWidthBtn").value = setBorderTopWidth;
  document.getElementById("bRightWidthBtn").value = setBorderRightWidth;
  document.getElementById("bBottomWidthBtn").value = setBorderBottomWidth;
  document.getElementById("bLeftWidthBtn").value = setBorderLeftWidth;
  document.getElementById("bTopLeftRadiusBtn").value = setBorderTopLeftRadius;
  document.getElementById("bTopRightRadiusBtn").value = setBorderTopRightRadius;
  document.getElementById("bBottomLeftRadiusBtn").value = setBorderBottomLeftRadius;
  document.getElementById("bBottomRightRadiusBtn").value = setBorderBottomRightRadius;
  document.getElementById("bStyleBtn").value = setBorderStyle;
  document.getElementById("bColorBtn").value = rgb2hex(setBorderColor);
  if (bColorValue == true) {
    document.getElementById("bColorPickerBtn").value = rgb2hex(setBorderColor);
  } else {
    document.getElementById("bColorPickerBtn").value = '#000000';
  }
  document.getElementById("fSizeBtn").value = setfSize;
  document.getElementById("fWeightBtn").value = setfWeight;
  document.getElementById("tAlignBtn").value = settAlign;
  document.getElementById("widthBtn").value = setwidth;
  document.getElementById("mWidthBtn").value = setmaxWidth;
  document.getElementById("mHeightBtn").value = setminHeight;
  document.getElementById("txtColorBtn").value = rgb2hex(settxtColor);
  if (txtColorValue == true) {
    document.getElementById("txtColorPickerBtn").value = rgb2hex(setbgColor);
  } else {
    document.getElementById("txtColorPickerBtn").value = '#000000';
  }
  document.getElementById("bgColorBtn").value = rgb2hex(setbgColor);
  if (bgColorValue == true) {
    document.getElementById("bgColorPickerBtn").value = rgb2hex(setbgColor);
  } else {
    document.getElementById("bgColorPickerBtn").value = '#000000';
  }

  saveBtn.onclick = function () {
    var pTopBtn = document.getElementById("pTopBtn").value;
    var pBottomBtn = document.getElementById("pBottomBtn").value;
    var pLeftBtn = document.getElementById("pLeftBtn").value;
    var pRightBtn = document.getElementById("pRightBtn").value;
    var mTopBtn = document.getElementById("mTopBtn").value;
    var mBottomBtn = document.getElementById("mBottomBtn").value;
    var mLeftBtn = document.getElementById("mLeftBtn").value;
    var mRightBtn = document.getElementById("mRightBtn").value;
    var bTopWidthBtn = document.getElementById("bTopWidthBtn").value;
    var bRightWidthBtn = document.getElementById("bRightWidthBtn").value;
    var bBottomWidthBtn = document.getElementById("bBottomWidthBtn").value;
    var bLeftWidthBtn = document.getElementById("bLeftWidthBtn").value;
    var bStyleBtn = document.getElementById("bStyleBtn").value;
    var bColorBtn = document.getElementById("bColorBtn").value;
    var bTopLeftRadiusBtn = document.getElementById("bTopLeftRadiusBtn").value;
    var bTopRightRadiusBtn = document.getElementById("bTopRightRadiusBtn").value;
    var bBottomRightRadiusBtn = document.getElementById("bBottomRightRadiusBtn").value;
    var bBottomLeftRadiusBtn = document.getElementById("bBottomLeftRadiusBtn").value;
    var fSizeBtn = document.getElementById("fSizeBtn").value;
    var fWeightBtn = document.getElementById("fWeightBtn").value;
    var tAlignBtn = document.getElementById("tAlignBtn").value;
    var widthBtn = document.getElementById("widthBtn").value;
    var mWidthBtn = document.getElementById("mWidthBtn").value;
    var mHeightBtn = document.getElementById("mHeightBtn").value;
    var txtColorBtn = document.getElementById("txtColorBtn").value;
    var bgColorBtn = document.getElementById("bgColorBtn").value;

    const selectedButton = document.getElementById(getBtnParentId).firstElementChild;
    const selectedButton2 = document.getElementById(getBtnParentId);

    selectedButton.style.paddingTop = pTopBtn;
    selectedButton.style.paddingBottom = pBottomBtn;
    selectedButton.style.paddingLeft = pLeftBtn;
    selectedButton.style.paddingRight = pRightBtn;
    selectedButton.style.marginTop = mTopBtn;
    selectedButton.style.marginBottom = mBottomBtn;
    selectedButton.style.marginLeft = mLeftBtn;
    selectedButton.style.marginRight = mRightBtn;
    selectedButton.style.borderTopWidth = bTopWidthBtn;
    selectedButton.style.borderRightWidth = bRightWidthBtn;
    selectedButton.style.borderBottomWidth = bBottomWidthBtn;
    selectedButton.style.borderLeftWidth = bLeftWidthBtn;
    selectedButton.style.borderStyle = bStyleBtn;
    selectedButton.style.borderColor = bColorBtn;
    selectedButton.style.borderTopLeftRadius = bTopLeftRadiusBtn;
    selectedButton.style.borderTopRightRadius = bTopRightRadiusBtn;
    selectedButton.style.borderBottomRightRadius = bBottomRightRadiusBtn;
    selectedButton.style.borderBottomLeftRadius = bBottomLeftRadiusBtn;
    selectedButton.style.fontSize = fSizeBtn;
    selectedButton.style.fontWeight = fWeightBtn;
    selectedButton2.style.textAlign = tAlignBtn;
    selectedButton.style.width = widthBtn;
    selectedButton.style.maxWidth = mWidthBtn;
    selectedButton.style.minHeight = mHeightBtn;
    selectedButton.style.color = txtColorBtn;
    selectedButton.style.backgroundColor = bgColorBtn;

    editBtn.style.animationName = "exit";
    setTimeout(() => {
      editBtn.style.display = "none";
    }, 480);

  }

  bColorPickerBtn.onchange = function () {
    document.getElementById("bColorBtn").value = document.getElementById("bColorPickerBtn").value;
  }

  bColorInputBtn.onchange = function () {
      document.getElementById("bColorPickerBtn").value = document.getElementById("bColorBtn").value;
  }

 txtColorPickerBtn.onchange = function () {
    document.getElementById("txtColorBtn").value = document.getElementById("txtColorPickerBtn").value;
  }

  txtColorInputBtn.onchange = function () {
      document.getElementById("txtColorPickerBtn").value = document.getElementById("txtColorBtn").value;
  }

  bgColorPickerBtn.onchange = function () {
    document.getElementById("bgColorBtn").value = document.getElementById("bgColorPickerBtn").value;
  }

  bgColorInputBtn.onchange = function () {
      document.getElementById("bgColorPickerBtn").value = document.getElementById("bgColorBtn").value;
  }

  closeBtn.onclick = function () {
    editBtn.style.animationName = "exit";
    setTimeout(() => {
      editBtn.style.display = "none";
    }, 480);
  };
}

// IMAGE EDITOR

var saveImg = document.getElementById("saveImg");
var delImg = document.getElementById("delImg");
var editImg = document.getElementById('myImg');
var bColorPickerImg = document.getElementById('bColorPickerImg');
var bColorInputImg = document.getElementById('bColorImg');
var bgColorPickerImg = document.getElementById('bgColorPickerImg');
var bgColorInputImg = document.getElementById('bgColorImg');
var closeImg = editImg.getElementsByClassName('close')[0];
var uploadImg = document.getElementById('file');
var errorImg = document.getElementById('img-Output');

function openImgForm(event) {
  event.stopPropagation();
  document.getElementById("myImg").style.display = "block";

  let btn = event.target.parentElement.parentElement.previousElementSibling.className;
  const imgEditor = btn.includes('imgs');
  editImg.style.animationName = "show";

  if (imgEditor == true) {
    const textEditor = document.getElementById('myText');
    const contEditor = document.getElementById('myContainer');
    const btnEditor = document.getElementById('myBtn');
    textEditor.style.display = 'none';
    contEditor.style.display = 'none';
    btnEditor.style.display = 'none';
  } else {
    const textEditor = document.getElementById('myText');
    const contEditor = document.getElementById('myContainer');
    const btnEditor = document.getElementById('myBtn');
    const imgEditor = document.getElementById('myImg');
    textEditor.style.display = 'none';
    contEditor.style.display = 'none';
    btnEditor.style.display = 'none';
    imgEditor.style.display = 'none';
  }

  const getImgParentId = event.target.parentElement.parentElement.parentElement.id;
  document.getElementById("iTitle").innerHTML = getImgParentId;

  dupImg.onclick = function () {
    const node = document.getElementById(getImgParentId);
    const cloneCol = node.cloneNode(true);
    const splitId = getImgParentId.split("-");
    const newId = Math.floor(Math.random() * Date.now());
    const dupId = splitId[0] + "-" + newId;
    event.target.parentElement.parentElement.parentElement.parentElement.appendChild(cloneCol).setAttribute("id", dupId);
    const parentDiv = node.parentElement;
    const lastElemChild = parentDiv.lastElementChild;
    const delClose = lastElemChild.previousElementSibling;
    delClose.remove();
    const divClose = document.createElement("div");
    divClose.setAttribute("id", "blkClose-" + newId);
    divClose.setAttribute("class", "divClose");
    const divCloseChild = document.createElement("div");
    divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
    event.target.parentElement.parentElement.parentElement.parentElement.appendChild(divClose).setAttribute("title", "div-close");
}

  delImg.onclick = function () {
    var el = document.getElementById(getImgParentId);
    el.parentNode.removeChild(el);
  }

  const initialParentEntry = document.getElementById(getImgParentId);
  const initialEntry = document.getElementById(getImgParentId).firstElementChild;

  var settopPadding = initialEntry.style.paddingTop;
  var setbottomPadding = initialEntry.style.paddingBottom;
  var setleftPadding = initialEntry.style.paddingLeft;
  var setrightPadding = initialEntry.style.paddingRight;
  var setmarginTop = initialEntry.style.marginTop
  var setmarginBottom = initialEntry.style.marginBottom
  var setmarginLeft = initialEntry.style.marginLeft
  var setmarginRight = initialEntry.style.marginRight
  var setBorderTopWidth = initialEntry.style.borderTopWidth;
  var setBorderRightWidth = initialEntry.style.borderRightWidth;
  var setBorderBottomWidth = initialEntry.style.borderBottomWidth;
  var setBorderLeftWidth = initialEntry.style.borderLeftWidth;
  var setBorderStyle = initialEntry.style.borderStyle;
  var setBorderColor = initialEntry.style.borderColor;
  var setBorderTopLeftRadius = initialEntry.style.borderTopLeftRadius;
  var setBorderTopRightRadius = initialEntry.style.borderTopRightRadius;
  var setBorderBottomLeftRadius = initialEntry.style.borderBottomLeftRadius;
  var setBorderBottomRightRadius = initialEntry.style.borderBottomRightRadius;
  var setwidth = initialEntry.style.width;
  var setmaxWidth = initialEntry.style.maxWidth;
  var setminHeight = initialEntry.style.minHeight;
  var setbgColor = initialEntry.style.backgroundColor;
  var setImgPreview = initialEntry.src;
  var setImgSrc = initialEntry.src;
  var settAlign = initialParentEntry.style.textAlign;

  const bColorValue = setBorderColor.includes('rgb'); 
  const bgColorValue = setbgColor.includes('rgb'); 

  document.getElementById("pTopImg").value = settopPadding;
  document.getElementById("pBottomImg").value = setbottomPadding;
  document.getElementById("pLeftImg").value = setleftPadding;
  document.getElementById("pRightImg").value = setrightPadding;
  document.getElementById("mTopImg").value = setmarginTop;
  document.getElementById("mBottomImg").value = setmarginBottom;
  document.getElementById("mLeftImg").value = setmarginLeft;
  document.getElementById("mRightImg").value = setmarginRight;
  document.getElementById("bTopWidthImg").value = setBorderTopWidth;
  document.getElementById("bRightWidthImg").value = setBorderRightWidth;
  document.getElementById("bBottomWidthImg").value = setBorderBottomWidth;
  document.getElementById("bLeftWidthImg").value = setBorderLeftWidth;
  document.getElementById("bTopLeftRadiusImg").value = setBorderTopLeftRadius;
  document.getElementById("bTopRightRadiusImg").value = setBorderTopRightRadius;
  document.getElementById("bBottomLeftRadiusImg").value = setBorderBottomLeftRadius;
  document.getElementById("bBottomRightRadiusImg").value = setBorderBottomRightRadius;
  document.getElementById("bStyleImg").value = setBorderStyle;
  document.getElementById("bColorImg").value = rgb2hex(setBorderColor);
  if (bColorValue == true) {
    document.getElementById("bColorPickerImg").value = rgb2hex(setBorderColor);
  } else {
    document.getElementById("bColorPickerImg").value = '#000000';
  }
  document.getElementById("widthImg").value = setwidth;
  document.getElementById("mWidthImg").value = setmaxWidth;
  document.getElementById("mHeightImg").value = setminHeight;
  document.getElementById("bgColorImg").value = rgb2hex(setbgColor);
  if (bgColorValue == true) {
    document.getElementById("bgColorPickerImg").value = rgb2hex(setbgColor);
  } else {
    document.getElementById("bgColorPickerImg").value = '#000000';
  }

  document.getElementById("imgUrl").value = setImgSrc;
  document.getElementById("output").src = setImgPreview;
  document.getElementById("tAlignImg").value = settAlign;

  var imgSrc = "";
  uploadImg.onchange = (event) => {
    const image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
    imgSrc += image.src
    document.getElementById('imgUrl').value = imgSrc;
  };


  
  saveImg.onclick = function () {

    const getImg = event.target;
    getImg.setAttribute("src", imgSrc);

    var pTopImg = document.getElementById("pTopImg").value;
    var pBottomImg = document.getElementById("pBottomImg").value;
    var pLeftImg = document.getElementById("pLeftImg").value;
    var pRightImg = document.getElementById("pRightImg").value;
    var mTopImg = document.getElementById("mTopImg").value;
    var mBottomImg = document.getElementById("mBottomImg").value;
    var mLeftImg = document.getElementById("mLeftImg").value;
    var mRightImg = document.getElementById("mRightImg").value;
    var bTopWidthImg = document.getElementById("bTopWidthImg").value;
    var bRightWidthImg = document.getElementById("bRightWidthImg").value;
    var bBottomWidthImg = document.getElementById("bBottomWidthImg").value;
    var bLeftWidthImg = document.getElementById("bLeftWidthImg").value;
    var bStyleImg = document.getElementById("bStyleImg").value;
    var bColorImg = document.getElementById("bColorImg").value;
    var bTopLeftRadiusImg = document.getElementById("bTopLeftRadiusImg").value;
    var bTopRightRadiusImg = document.getElementById("bTopRightRadiusImg").value;
    var bBottomRightRadiusImg = document.getElementById("bBottomRightRadiusImg").value;
    var bBottomLeftRadiusImg = document.getElementById("bBottomLeftRadiusImg").value;
    var widthImg = document.getElementById("widthImg").value;
    var mWidthImg = document.getElementById("mWidthImg").value;
    var mHeightImg = document.getElementById("mHeightImg").value;
    var bgColorImg = document.getElementById("bgColorImg").value;
    var imgUrl = document.getElementById("imgUrl").value;
    var tAlignImg = document.getElementById("tAlignImg").value;

    const selectedImageParent = document.getElementById(getImgParentId);
    const selectedImage = document.getElementById(getImgParentId).firstElementChild;

    selectedImage.style.paddingTop = pTopImg;
    selectedImage.style.paddingBottom = pBottomImg;
    selectedImage.style.paddingLeft = pLeftImg;
    selectedImage.style.paddingRight = pRightImg;
    selectedImage.style.marginTop = mTopImg;
    selectedImage.style.marginBottom = mBottomImg;
    selectedImage.style.marginLeft = mLeftImg;
    selectedImage.style.marginRight = mRightImg;
    selectedImage.style.borderTopWidth = bTopWidthImg;
    selectedImage.style.borderRightWidth = bRightWidthImg;
    selectedImage.style.borderBottomWidth = bBottomWidthImg;
    selectedImage.style.borderLeftWidth = bLeftWidthImg;
    selectedImage.style.borderStyle = bStyleImg;
    selectedImage.style.borderColor = bColorImg;
    selectedImage.style.borderTopLeftRadius = bTopLeftRadiusImg;
    selectedImage.style.borderTopRightRadius = bTopRightRadiusImg;
    selectedImage.style.borderBottomRightRadius = bBottomRightRadiusImg;
    selectedImage.style.borderBottomLeftRadius = bBottomLeftRadiusImg;
    selectedImage.style.width = widthImg;
    selectedImage.style.maxWidth = mWidthImg;
    selectedImage.style.minHeight = mHeightImg;
    selectedImage.style.backgroundColor = bgColorImg;
    selectedImage.src = imgUrl;
    selectedImageParent.style.textAlign = tAlignImg;

    editImg.style.animationName = "exit";
    setTimeout(() => {
      editImg.style.display = "none";
    }, 480);

  }

  bColorPickerImg.onchange = function () {
    document.getElementById("bColorImg").value = document.getElementById("bColorPickerImg").value;
  }
  
  bColorInputImg.onchange = function () {
      document.getElementById("bColorPickerImg").value = document.getElementById("bColorImg").value;
  }
  
  bgColorPickerImg.onchange = function () {
    document.getElementById("bgColorImg").value = document.getElementById("bgColorPickerImg").value;
  }
  
  bgColorInputImg.onchange = function () {
      document.getElementById("bgColorPickerImg").value = document.getElementById("bgColorImg").value;
  }
  
  closeImg.onclick = function () {
    editImg.style.animationName = "exit";
    setTimeout(() => {
      editImg.style.display = "none";
    }, 480);
  };
}

function hover(event) {
  event.stopPropagation();
    const elId = event.target.id;
    const pageElId = elId.includes('-');
    if (pageElId == true) {
      const hoverItem = document.getElementById(elId);
      hoverItem.classList.toggle('hover');
    }
  }

  function hoverRow(event) {
    event.stopPropagation();
    const elId = event.target.id;
    const pageElId = elId.includes('row-');
    if (pageElId == true) {
      const hoverItem = document.getElementById(elId);
      hoverItem.classList.toggle('hover');
    }
  }

  function hoverBlk(event) {
    event.stopPropagation();
    const itmId = event.target.id;
    const elId = event.target.parentElement.id;
    const selectElId = itmId.includes('-');
    const pageElId = elId.includes('-');
    if (selectElId == true || pageElId == true) {
      const hoverItem = document.getElementById(elId);
      hoverItem.classList.toggle('hover');
    }
  }


  function hoverBtnParent(event) {
    event.stopPropagation();
    const elId = event.target.parentElement.id;
      const hoverItem = document.getElementById(elId);
      hoverItem.classList.toggle('hover');
  }

 function hoverBtnGrp(event) {
  event.stopPropagation();
  const elId = event.target.parentElement.parentElement.id;
    const hoverItem = document.getElementById(elId);
    hoverItem.classList.toggle('hover');
}


var editEl = document.getElementById("secEditOnHover");
var dupEl = document.getElementById("secDupOnHover");


 function hoverBtn(event) {
  event.stopPropagation();
  const elId = event.target.parentElement.parentElement.parentElement.id;
    const hoverItem = document.getElementById(elId);
    hoverItem.classList.toggle('hover');
}

function delElement(event) {
  const getIdDel = event.target.parentElement.parentElement.parentElement.id;
  var el = document.getElementById(getIdDel);
  el.parentNode.removeChild(el);
}


function dupContainer(event) {
  const getContId = event.target.parentElement.parentElement.parentElement.id;
  const secCont = getContId.includes('section-');
  const colCont = getContId.includes('column-');
  const contChild = event.target.parentElement.parentElement.parentElement.children;
  const node = document.getElementById(getContId);
  const cloneCol = node.cloneNode(true);
  const splitId = getContId.split("-");
  const newId = Math.floor(Math.random() * Date.now());
  const dupId = splitId[0] + "-" + newId;
  if (secCont == true) {
    for (var i = 0; i < contChild.length; i++) {
      const contChildId = contChild[i].attributes.id;

      if (contChildId != undefined) {
        const contChildIdValue = contChild[i].attributes.id.value;
        const splitChildId = contChildIdValue.split("-");
        const dupChildId = splitChildId[0] + "-" + newId + i;
        contChild[i].setAttribute("id", dupChildId);
        const contGrandChild = contChild[i].children;

        for (var j = 0; j < contGrandChild.length; j++) {
          const contGrandChildId = contGrandChild[j].id;

          if (contGrandChildId != "") {
            const splitGrandChildId = contGrandChildId.split("-");
            const dupGrandChildId = splitGrandChildId[0] + "-" + newId + j;
            contGrandChild[j].setAttribute("id", dupGrandChildId);
            const contGreatGrandChild = contGrandChild[j].children;

            for (var k = 0; k < contGreatGrandChild.length; k++) {
              const contGreatGrandChildId = contGreatGrandChild[k].id;

              if (contGreatGrandChildId != "") {
                const splitGreatGrandChildId = contGreatGrandChildId.split("-");
                const dupGreatGrandChildId = splitGreatGrandChildId[0] + "-" + newId + j + k;
                const contGreat2xGrandChild = contGreatGrandChild[k].children;
                contGreatGrandChild[k].setAttribute("id", dupGreatGrandChildId);
                for (var l = 0; l < contGreat2xGrandChild.length; l++) {
                  const contGreat2xGrandChildId = contGreat2xGrandChild[l].id;
                  const getDivOpenChildId = contGreat2xGrandChildId.includes('divOpenChild-');
                  const getDivCloseChildId = contGreat2xGrandChildId.includes('divCloseChild-');

                  if (getDivOpenChildId == true || getDivCloseChildId == true) {
                    const splitDivChildId = contGreat2xGrandChildId.split("-");
                    const dupDivChildId = splitDivChildId[0] + "-" + newId + (j + k + l + 1);
                    contGreat2xGrandChild[l].setAttribute("id", dupDivChildId);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  if (colCont == true) {
    for (var i = 0; i < contChild.length; i++) {
      const contChildId = contChild[i].attributes.id;
      if (contChildId != undefined) {
        const contChildIdValue = contChild[i].attributes.id.value;
        const splitChildId = contChildIdValue.split("-");
        const dupChildId = splitChildId[0] + "-" + newId + i;
        const contGrandChild = contChild[i].children;
        contChild[i].setAttribute("id", dupChildId);
        for (var j = 0; j < contGrandChild.length; j++) {
          const contGrandChildId = contGrandChild[j].id;
          if (contGrandChildId != "") {
            const getDivOpenChildId = contGrandChildId.includes('divOpenChild-');
            const getDivCloseChildId = contGrandChildId.includes('divCloseChild-');
            if (getDivOpenChildId == true || getDivCloseChildId == true) {
              const splitDivChildId = contGrandChildId.split("-");
              const dupDivChildId = splitDivChildId[0] + "-" + newId + (j + 1);
              contGrandChild[j].setAttribute("id", dupDivChildId);
            }
          }
        }
      }
    }
  }
    cloneCol.classList.remove('hover');
    event.target.parentElement.parentElement.parentElement.parentElement.appendChild(cloneCol).setAttribute("id", dupId);
}


function dupText(event) {
  const getParentId = event.target.parentElement.parentElement.parentElement.id;
  const node = document.getElementById(getParentId);
  const cloneCol = node.cloneNode(true);
  const splitId = getParentId.split("-");
  const newId = Math.floor(Math.random() * Date.now());
  const dupId = splitId[0] + "-" + newId;
  cloneCol.classList.remove('hover');
  event.target.parentElement.parentElement.parentElement.parentElement.appendChild(cloneCol).setAttribute("id", dupId);
  const parentDiv = node.parentElement;
  const lastElemChild = parentDiv.lastElementChild;
  const delClose = lastElemChild.previousElementSibling;
  delClose.remove();
  const divClose = document.createElement("div");
  divClose.setAttribute("id", "blkClose-" + newId);
  divClose.setAttribute("class", "divClose");
  const divCloseChild = document.createElement("div");
  divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
  event.target.parentElement.parentElement.parentElement.parentElement.appendChild(divClose).setAttribute("title", "div-close");
}

function dupButton(event) {
  const getBtnParentId = event.target.parentElement.parentElement.parentElement.id;
  const node = document.getElementById(getBtnParentId);
  const cloneCol = node.cloneNode(true);
  const splitId = getBtnParentId.split("-");
  const newId = Math.floor(Math.random() * Date.now());
  const dupId = splitId[0] + "-" + newId;
  cloneCol.classList.remove('hover');
  event.target.parentElement.parentElement.parentElement.parentElement.appendChild(cloneCol).setAttribute("id", dupId);
  const parentDiv = node.parentElement;
  const lastElemChild = parentDiv.lastElementChild;
  const delClose = lastElemChild.previousElementSibling;
  delClose.remove();
  const divClose = document.createElement("div");
  divClose.setAttribute("id", "blkClose-" + newId);
  divClose.setAttribute("class", "divClose");
  const divCloseChild = document.createElement("div");
  divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
  event.target.parentElement.parentElement.parentElement.parentElement.appendChild(divClose).setAttribute("title", "div-close");
}

function dupImage(event) {
  const getImgParentId = event.target.parentElement.parentElement.parentElement.id;
  const node = document.getElementById(getImgParentId);
  const cloneCol = node.cloneNode(true);
  const splitId = getImgParentId.split("-");
  const newId = Math.floor(Math.random() * Date.now());
  const dupId = splitId[0] + "-" + newId;
  cloneCol.classList.remove('hover');
  event.target.parentElement.parentElement.parentElement.parentElement.appendChild(cloneCol).setAttribute("id", dupId);
  const parentDiv = node.parentElement;
  const lastElemChild = parentDiv.lastElementChild;
  const delClose = lastElemChild.previousElementSibling;
  delClose.remove();
  const divClose = document.createElement("div");
  divClose.setAttribute("id", "blkClose-" + newId);
  divClose.setAttribute("class", "divClose");
  const divCloseChild = document.createElement("div");
  divClose.appendChild(divCloseChild).setAttribute("id", "divCloseChild-" + newId);
  event.target.parentElement.parentElement.parentElement.parentElement.appendChild(divClose).setAttribute("title", "div-close");
}

function moveUp(event) {
  const getElId = event.target.parentElement.parentElement.parentElement.id;
  const getElParentId = event.target.parentElement.parentElement.parentElement.parentElement.id;
  const parent = document.getElementById(getElParentId);
  const elem = document.getElementById(getElId);
	const previous = elem.previousElementSibling;

	if (previous == null) {
		// console.log('reached the top');
	} else {
    const prevClass = previous.attributes.class.value;
    const checkPrevClass = prevClass.includes('editBtnGrp');
    const checkBlkClass = prevClass.includes('divOpen');
    if (checkPrevClass == false) {
      if (checkBlkClass == false) {
		parent.insertBefore(elem, previous);
      }
    }
	}
}

function moveDown(event) {
  const getElId = event.target.parentElement.parentElement.parentElement.id;
  const getElParentId = event.target.parentElement.parentElement.parentElement.parentElement.id;
  const parent = document.getElementById(getElParentId);
  const elem = document.getElementById(getElId);
	const next = elem.nextElementSibling;
	if (next == null) {
			// console.log('reached the bottom');
	} else {
    const nextClass = next.attributes.class.value;
    const checknextClass = nextClass.includes('divClose');
    if (checknextClass == false) {
		parent.insertBefore(elem, next.nextElementSibling);
    }
	}
}
