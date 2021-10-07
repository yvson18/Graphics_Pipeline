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


// m_model * pontos            
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

//console.log(xc);
//console.log(yc);
//console.log(zc);

// Matriz Bt

let m_Bt = new THREE.Matrix4();
m_Bt.set(xc.x, xc.y, xc.z, 0.0,
         yc.x, yc.y, yc.z, 0.0,
         zc.x, zc.y, zc.z, 0.0,
         0.0,  0.0,  0.0,  1.0);

//console.log(m_Bt);

let m_T = new THREE.Matrix4();
m_T.set(1.0, 0.0, 0.0, -cam_pos.x,
        0.0, 1.0, 0.0, -cam_pos.y,
        0.0, 0.0, 1.0, -cam_pos.z,
        0.0, 0.0, 0.0,  1.0      );

//console.log(m_T);

let m_view = new THREE.Matrix4(); m_view.multiplyMatrices(m_Bt,m_T);

//console.log(m_view);

// // m_view * ponto  
for (let i = 0; i < 8; ++i){
    vertices[i].applyMatrix4(m_view);
}
        
//--------------------- ESP. CÂMERA ==> ESP. DE RECORTE ----------------------

let m_projection = new THREE.Matrix4();
let d = 1;

// Construindo a Matriz de Projecao

// matriz de projeção com correcao
m_projection.set(1.0, 0.0, 0.0, 0.0,
                 0.0, 1.0, 0.0, 0.0,
                 0.0, 0.0, 1.0,   d,
                 0.0, 0.0,-1/d, 0.0);


// m_projection * ponto
for (let i = 0; i < 8; ++i){
    vertices[i].applyMatrix4(m_projection);
}

//console.log(vertices[0]);

//--------------------- ESP. DE RECORTE ==> ESP. CANÔNICO ----------------------

//Homogeneizacao (divisao por W)
for (let i = 0; i < 8; ++i){
    vertices[i].divideScalar(vertices[i].w);
}

//console.log(vertices[0]);

//--------------------- ESP. CANÔNICO  ==> ESP. TELA ----------------------

let m_Tr = new THREE.Matrix4();
m_Tr.set(1.0, 0.0, 0.0, 1.0,
         0.0, 1.0, 0.0, 1.0,
         0.0, 0.0, 1.0, 0.0,
         0.0, 0.0, 0.0, 1.0);

let m_S = new THREE.Matrix4();
let S = 128.0; // considerando um canvas quadrado
m_S.set(S/2, 0.0, 0.0, 0.0,
        0.0, S/2, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0 );

let m_viewport = new THREE.Matrix4();m_viewport.multiplyMatrices(m_S,m_Tr);

console.log(m_viewport);
for (let i = 0; i < 8; ++i){
   vertices[i].applyMatrix4(m_viewport);
}

//---------------------RASTEIRIZACAO ----------------------

// Cria um color buffer para armazenar a imagem final.
// let color_buffer_1 = new Canvas("canvas");
// color_buffer_1.clear();
// // ---------- implementar aqui ----------------------------------------------
