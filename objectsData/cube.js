export let cube = {
    vs: [
        // PRZÓD
        {x: 0.25, y: 0.25, z: 0.25},  // 0: Prawy-Góra
        {x: 0.25, y:-0.25, z: 0.25},  // 1: Prawy-Dół
        {x:-0.25, y:-0.25, z: 0.25},  // 2: Lewy-Dół
        {x:-0.25, y: 0.25, z: 0.25},  // 3: Lewy-Góra
        
        // TYŁ
        {x: 0.25, y: 0.25, z:-0.25},  // 4: Prawy-Góra
        {x: 0.25, y:-0.25, z:-0.25},  // 5: Prawy-Dół
        {x:-0.25, y:-0.25, z:-0.25},  // 6: Lewy-Dół
        {x:-0.25, y: 0.25, z:-0.25},  // 7: Lewy-Góra
    ],
    edges: [
        [0,1,2,3], // Przód
        [4,5,6,7], // Tył
        [0,4],     // Połączenie góra-prawo
        [1,5],     // Połączenie dół-prawo
        [2,6],     // Połączenie dół-lewo
        [3,7],     // Połączenie góra-lewo
    ],
    fs: [
        // Przód
        [0,1,2],
        [2,3,0],
        // Tył
        [4,5,6],
        [6,7,4],
        // Lewo
        [2,6,7],
        [7,3,2],
        // Prawo
        [0,4,5],
        [5,1,0],
        // Góra
        [0,4,7],
        [7,3,0],
        // Dół 
        [1,2,6],
        [6,5,1]
    ],
}
