/*******************************************************************************
                           PIPELINE GRÁFICO
          Autores: João Victor Galvão e Yvson Nunes Figueiredo
*******************************************************************************/


// Descrição do(s) Objeto(s):

// Lista de Vértices
//                                  X     Y     Z    W (coord. homogênea)
let vertices = [new THREE.Vector4(-1.0, -1.0, -1.0, 1.0),
                new THREE.Vector4( 1.0, -1.0, -1.0, 1.0),
                new THREE.Vector4( 1.0, -1.0,  1.0, 1.0),
                new THREE.Vector4(-1.0, -1.0,  1.0, 1.0),
                new THREE.Vector4(-1.0,  1.0, -1.0, 1.0),
                new THREE.Vector4( 1.0,  1.0, -1.0, 1.0),
                new THREE.Vector4( 1.0,  1.0,  1.0, 1.0),
                new THREE.Vector4(-1.0,  1.0,  1.0, 1.0)];

// Lista de Arestas
let edges = [[0,1],
            [1,2],
            [2,3],
            [3,0],
            [4,5],
            [5,6],
            [6,7],
            [7,4],
            [0,4],
            [1,5],
            [2,6],
            [3,7]];


//--------------------- ESP. OBJETO ==> ESP. UNIVERSO -------------------------

// Matriz Model
let m_model = new THREE.Matrix4();
//Identidade
m_model.set(1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0);

for (let i = 0; i < 8; ++i){ 
   vertices[i].applyMatrix4(m_model);
}

//--------------------- ESP. UNIVERSO ==> ESP. DA CÂMERA ----------------------

let cam_pos = new THREE.Vector3(1.3,1.7,2.0);     // posição da câmera no esp. do Universo.
let cam_look_at = new THREE.Vector3(0.0,0.0,0.0); // ponto para o qual a câmera aponta.
let cam_up = new THREE.Vector3(0.0,1.0,0.0);      // vetor Up da câmera.


// Exemplo resolvido em sala (útil para debugar)
// let cam_pos = new THREE.Vector3(5,10,5);     // posição da câmera no esp. do Universo.
// let cam_look_at = new THREE.Vector3(5,10,0); // ponto para o qual a câmera aponta.
// let cam_up = new THREE.Vector3(0.0,1.0,0.0);      // vetor Up da câmera.

// Construindo a Matriz view

let cam_dir = cam_look_at.clone().add(cam_pos.clone().multiplyScalar(-1.0)); //  cam_look_at (O) - cam_pos(P) = D = PO

let zc = cam_dir.clone().multiplyScalar(-1.0).normalize(); // Zcam = -D / ||D||
let xc = cam_up.clone().cross(zc).normalize();// Xcam = u x Zcam / ||u x Zcam||
let yc = zc.clone().cross(xc);// Ycam = Zcam x Xcam

console.log(xc);
console.log(yc);
console.log(zc);

// Matriz Bt

let m_Bt = new THREE.Matrix4();
m_Bt.set(xc.x, xc.y, xc.z, 0.0,
         yc.x, yc.y, yc.z, 0.0,
         zc.x, zc.y, zc.z, 0.0,
         0.0,  0.0,  0.0,  1.0);

console.log(m_Bt);

let m_T = new THREE.Matrix4();
m_T.set(1.0, 0.0, 0.0, -cam_pos.x,
        0.0, 1.0, 0.0, -cam_pos.y,
        0.0, 0.0, 1.0, -cam_pos.z,
        0.0, 0.0, 0.0,  1.0      );

console.log(m_T);

let m_View = new THREE.Matrix4(); m_View.multiplyMatrices(m_Bt,m_T);

console.log(m_View);


// /******************************************************************************
//  * Matriz View (visualização): Esp. Universo --> Esp. Câmera
//  * OBS: A matriz está carregada inicialmente com a identidade. 
//  *****************************************************************************/

// // Derivar os vetores da base da câmera a partir dos parâmetros informados acima.

// // ---------- implementar aqui ----------------------------------------------

// // Construir 'm_bt', a inversa da matriz de base da câmera.

// // ---------- implementar aqui ----------------------------------------------
// let m_bt = new THREE.Matrix4();

// m_bt.set(1.0, 0.0, 0.0, 0.0,
//         0.0, 1.0, 0.0, 0.0,
//         0.0, 0.0, 1.0, 0.0,
//         0.0, 0.0, 0.0, 1.0);

// // Construir a matriz 'm_t' de translação para tratar os casos em que as
// // origens do espaço do universo e da câmera não coincidem.

// // ---------- implementar aqui ----------------------------------------------
// let m_t = new THREE.Matrix4();

// m_t.set(1.0, 0.0, 0.0, 0.0,
//         0.0, 1.0, 0.0, 0.0,
//         0.0, 0.0, 1.0, 0.0,
//         0.0, 0.0, 0.0, 1.0);

// // Constrói a matriz de visualização 'm_view' como o produto
// //  de 'm_bt' e 'm_t'.
// let m_view = m_bt.clone().multiply(m_t);

// for (let i = 0; i < 8; ++i)
//     vertices[i].applyMatrix4(m_view);

// /******************************************************************************
//  * Matriz de Projecao: Esp. Câmera --> Esp. Recorte
//  * OBS: A matriz está carregada inicialmente com a identidade. 
//  *****************************************************************************/

// // ---------- implementar aqui ----------------------------------------------
// let m_projection = new THREE.Matrix4();

// m_projection.set(1.0, 0.0, 0.0, 0.0,
//                 0.0, 1.0, 0.0, 0.0,
//                 0.0, 0.0, 1.0, 0.0,
//                 0.0, 0.0, 0.0, 1.0);

// for (let i = 0; i < 8; ++i)
// vertices[i].applyMatrix4(m_projection);

// /******************************************************************************
//  * Homogeneizacao (divisao por W): Esp. Recorte --> Esp. Canônico
//  *****************************************************************************/

// // ---------- implementar aqui ----------------------------------------------

// /******************************************************************************
//  * Matriz Viewport: Esp. Canônico --> Esp. Tela
//  * OBS: A matriz está carregada inicialmente com a identidade. 
//  *****************************************************************************/

// // ---------- implementar aqui ----------------------------------------------
// let m_viewport = new THREE.Matrix4();

// m_viewport.set(1.0, 0.0, 0.0, 0.0,
//                 0.0, 1.0, 0.0, 0.0,
//                 0.0, 0.0, 1.0, 0.0,
//                 0.0, 0.0, 0.0, 1.0);

// for (let i = 0; i < 8; ++i)
// vertices[i].applyMatrix4(m_viewport);

// /******************************************************************************
//  * Rasterização
//  *****************************************************************************/
// Cria um color buffer para armazenar a imagem final.
// let color_buffer_1 = new Canvas("canvas");
// color_buffer_1.clear();
// // ---------- implementar aqui ----------------------------------------------

