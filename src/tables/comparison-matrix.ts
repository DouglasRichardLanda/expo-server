const COMPARISON_MATRIX = new Map<number, number[][]>();

COMPARISON_MATRIX.set(1, [[9, 8, 4, 1],[6, 7],[2, 3, 5, 11, 22]]);
COMPARISON_MATRIX.set(2, [[8, 7, 9, 2],[3, 4, 6],[1, 5, 11, 22]]);
COMPARISON_MATRIX.set(3, [[7, 9, 5, 3],[2, 6, 11, 22],[1, 4, 8]]);
COMPARISON_MATRIX.set(4, [[6, 1, 8, 4],[2, 7, 9, 22],[3, 5, 11]]);
COMPARISON_MATRIX.set(5, [[8, 3, 7, 5],[2, 9, 11],[1, 4, 6, 22]]);
COMPARISON_MATRIX.set(6, [[4, 9, 22, 6],[1, 2, 3, 11],[5, 7, 8]]);
COMPARISON_MATRIX.set(7, [[3, 5, 2, 11, 7],[1, 4, 8, 22],[9, 6]]);
COMPARISON_MATRIX.set(8, [[2, 4, 1, 5, 8],[7, 9, 11, 22],[3, 6]]);
COMPARISON_MATRIX.set(9, [[1, 2, 3, 6, 11, 9],[4, 5, 8],[7, 22]]);
COMPARISON_MATRIX.set(11, [[22, 9, 7],[3, 5, 6, 8],[1, 2, 4]]);
COMPARISON_MATRIX.set(22, [[11, 6],[3, 4, 7, 8],[1, 2, 5, 9]]);

export default COMPARISON_MATRIX;