const demoArr = [
    ["a", "a", "b", "b"],
    ["0", "0", "b", "b"],
    ["0", "0", "b", "b"],
    ["0", "0", "b", "b"],
    ["0", "c", "c", "c"],
  ];
  let object1 = {
    a: { rowStart: null, rowEnd: null, colEnd: null, colStart: null, w: 0, h: 0 },
    b: { rowStart: null, rowEnd: null, colEnd: null, colStart: null, w: 0, h: 0 },
    c: { rowStart: null, rowEnd: null, colEnd: null, colStart: null, w: 0, h: 0 },
  };
  
  const setTree = (demoArr, object, rowStart, rowEnd, colEnd, colStart) => {
    getMaxHeightIntersections(
      demoArr,
      object,
      rowStart,
      rowEnd,
      colEnd,
      colStart
    );
  };
  const getIterationMatrix = (demoArr, rowStart, rowEnd, colStart, colEnd) => {
    rowStart = 1;
    rowEnd = 3;
    colStart = 2;
    colEnd = 3;
    var newMatrix = [];
    for (var i = 0; i < rowEnd - rowStart + 1; i++) {
      newMatrix[i] = [];
      for (var j = 0; j < colEnd - colStart + 1; j++) {
        newMatrix[i][j] = 0;
      }
    }
    let row = 0;
  
    for (let i = rowStart; i <= rowEnd; i++) {
      let col = 0;
      for (let j = colStart; j <= colEnd; j++) {
        newMatrix[row][col] = demoArr[i][j];
        col++;
      }
      row++;
    }
    return newMatrix;
  };
  
  const setRowColInfo1 = (chotaMatrix, object) => {
    for (let i = 0; i < chotaMatrix.length; i++) {
      for (let j = 0; j < chotaMatrix[i].length; j++) {
        if (chotaMatrix[i][j] !== "0") {
          if (object[chotaMatrix[i][j]].colStart == null) {
            object[chotaMatrix[i][j]].colStart = j;
          } else {
            object[chotaMatrix[i][j]].colEnd = j;
            object[chotaMatrix[i][j]].w =
              j - object[chotaMatrix[i][j]].colStart + 1;
          }
          if (object[chotaMatrix[i][j]].rowStart == null) {
            object[chotaMatrix[i][j]].rowStart = i;
          } else {
            object[chotaMatrix[i][j]].rowEnd = i;
            object[chotaMatrix[i][j]].h =
              i - object[chotaMatrix[i][j]].rowStart + 1;
          }
        }
      }
    }
    return object;
  };
  
  const getMaxHeightIntersections = (
    demoArr,
    object,
    rowStart,
    rowEnd,
    colEnd,
    colStart
  ) => {
    let arr = [];
    let max;
    let chotaMatrix = getIterationMatrix(
      demoArr,
      rowStart,
      rowEnd,
      colStart,
      colEnd
    );
    let tempObj = setRowColInfo1(chotaMatrix, object);
    Object.keys(object).forEach((element, index) => {
      max = element;
      for (let i = 0; i <= rowEnd; i++) {
        for (let j = 0; j <= colEnd; j++) {
          if (object[element].h > object[max].h) {
            max = element;
          }
        }
      }
    });
  };
  
  const setRowColInfo = (demoArr, object) => {
    for (let i = 0; i < demoArr.length; i++) {
      for (let j = 0; j < demoArr[i].length; j++) {
        if (demoArr[i][j] !== "0") {
          if (object[demoArr[i][j]].colStart == null) {
            object[demoArr[i][j]].colStart = j;
          } else {
            object[demoArr[i][j]].colEnd = j;
            object[demoArr[i][j]].w = j - object[demoArr[i][j]].colStart + 1;
          }
          if (object[demoArr[i][j]].rowStart == null) {
            object[demoArr[i][j]].rowStart = i;
          } else {
            object[demoArr[i][j]].rowEnd = i;
            object[demoArr[i][j]].h = i - object[demoArr[i][j]].rowStart + 1;
          }
        }
      }
    }
    let keys = Object.keys(object);
    setTree(demoArr, object, 0, demoArr.length - 1, demoArr[0].length - 1, 0);
  };
  const cloneObject = JSON.parse(JSON.stringify(object1));
  setRowColInfo(demoArr, cloneObject);
  console.log(cloneObject);