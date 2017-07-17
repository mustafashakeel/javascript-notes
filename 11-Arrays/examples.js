// multi-dimensional arrays
   var myMatrix = [];
   function generateMatrix(row,column){
       for (var i=0;i<row;i++){
           myMatrix[i] = [];
           for (var j=0;j<column;j++){
               myMatrix[i][j] = 0; // initialize a value of zeor for all elements of the matrix
           }
       }
   }

   generateMatrix(2,2);
   console.log(myMatrix); // [Array[2], Array[2]]     --> [[0,0],[0,0]]
   console.log(myMatrix.length);
   console.log(myMatrix.join('\n'));


   // 4x3 matrix (4 rows, 3 col) --> matrix = [['0','0','0'],['0','0','0'],['0','0','0'],['0','0','0']];
   var matrix = [

       ['0','0','0'],
       ['0','0','0'],
       ['0','0','0'],
       ['0','0','0']
   ];
   var i=0; //number of rows
   var j=0; // number of columns

   i = matrix.length;
   j = matrix[0].length;

   console.log('matrix('+i+'x'+j+')');
   console.log('This matrix has ' + i + ' rows and ' + j + ' columns');
