class Canvas {
    constructor(canvas_id) {
        this.canvas = document.getElementById(canvas_id);
        this.context = this.canvas.getContext("2d");
        this.clear_color = 'rgba(0,0,0,255)';
    }

    clear() {
        this.context.fillStyle = this.clear_color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    putPixel(x, y, color) {
        this.context.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
        this.context.fillRect(x, (this.canvas.height - 1) - y, 1, 1);
    }

    
}

let color_buffer = new Canvas("canvas");
color_buffer.clear();

function MidPointLineAlgorithm(xi, yi, xf, yf, color_0, color_1) {
    // coversão para o centro
    [xi,yi,xf,yf] = [xi+64 ,yi+64  , xf+64 , yf+64 ];      
    
    // Escreva seu código aqui!
    var m = (yf - yi) / (xf - xi);

    var dx;
    var dy;
    
    if((0 <= m && m <= 1) && (xi < xf)){ // primeiro octante
        dx = xf - xi;
        dy = yf - yi;

        var d = 2 * dy - dx; // Var de decisão para o pixel 1

        var incL = 2 * dy; // 2 * alfa
        var incNe = 2 * (dy - dx); // 2 * (alfa + beta)

        var x = xi;
        var y = yi;


        color_buffer.putPixel(x, y, color_0);

        var dist = xf - x - 1; // é utilizado na hora de normalizar t
        var i = 0;
        
        while(x < xf){
            if(d <= 0){
                d += incL; // caminhar para a direita (leste)
                x++;
            }else{
                d += incNe; // caminhar em diagonal (Nordeste)
                x++;
                y++;
            }
            //interpolação
            i++;
            var grad_color = [];
            grad_color.push(color_0[0] +(color_1[0]- color_0[0])* i/dist);// R
            grad_color.push(color_0[1] + (color_1[1]- color_0[1])* i/dist);// G
            grad_color.push(color_0[2] + (color_1[2]- color_0[2])* i/dist);// B
            grad_color.push(255);// ALPHA
            color_buffer.putPixel(x, y, grad_color);
            
        
        }

    }else if((m > 1) && (yi < yf)){ // segundo octante
        // Transformações
        // troca os valores de xi e yi
        let aux1;
        aux1 = xi;
        xi = yi;
        yi = aux1;
        // troca de valores de xf e yf
        let aux2;
        aux2 = xf;
        xf = yf;
        yf = aux2;

        dx = xf - xi;
        dy = yf - yi;

        var d = 2 * dy - dx; // Var de decisão para o pixel 1

        var incL = 2 * dy; // 2 * alfa
        var incNe = 2 * (dy - dx); // 2 * (alfa + beta)

        var x = xi;
        var y = yi;

        
        color_buffer.putPixel(y, x, color_0); // desfaz transformação
       
        // é utilizado na hora de interporlar 
        var dist = xf - x - 1; 
        var i = 0;

        while(x < xf){
            if(d <= 0){
                d += incL; // caminhar para a direita (leste)
                x++;
            }else{
                d += incNe; // caminhar em diagonal (Nordeste)
                x++;
                y++;
            }
            //interpolação
            i++;
            var grad_color = [];
            grad_color.push(color_0[0] +(color_1[0]- color_0[0])* i/dist);// R
            grad_color.push(color_0[1] + (color_1[1]- color_0[1])* i/dist);// G
            grad_color.push(color_0[2] + (color_1[2]- color_0[2])* i/dist);// B
            grad_color.push(255);// ALPHA
            color_buffer.putPixel(y, x, grad_color); // desfaz transformação
        }

    }else if((m < -1) && (yf > yi)){ // terceiro octante
        // Transformações
        // (-x,y)
        xi = -xi;
        xf = -xf;

        // troca os valores de xi e yi
        let aux1;
        aux1 = xi;
        xi = yi;
        yi = aux1;
        // troca de valores de xf e yf
        let aux2;
        aux2 = xf;
        xf = yf;
        yf = aux2;

        dx = xf - xi;
        dy = yf - yi;

        var d = 2 * dy - dx; // Var de decisão para o pixel 1

        var incL = 2 * dy; // 2 * alfa
        var incNe = 2 * (dy - dx); // 2 * (alfa + beta)

        var x = xi;
        var y = yi;

       
        color_buffer.putPixel(-y, x, color_0); // desfaz transformação

        // é utilizado na hora de interporlar 
        var dist = xf - x - 1;
        var i = 0;

        while(x < xf){
            if(d <= 0){
                d += incL; // caminhar para a direita (leste)
                x++;
            }else{
                d += incNe; // caminhar em diagonal (Nordeste)
                x++;
                y++;
            }
            //interpolação
            i++;
            var grad_color = [];
            grad_color.push(color_0[0] +(color_1[0]- color_0[0])* i/dist);// R
            grad_color.push(color_0[1] + (color_1[1]- color_0[1])* i/dist);// G
            grad_color.push(color_0[2] + (color_1[2]- color_0[2])* i/dist);// B
            grad_color.push(255);// ALPHA

            color_buffer.putPixel(-y, x, grad_color); // desfaz transformação
        }


    }else if((-1 <= m && m <= 0) && (xi > xf)){// quarto octante
        // Transformações
        // (-x,y)
        xi = -xi;
        xf = -xf;

        dx = xf - xi;
        dy = yf - yi;

        var d = 2 * dy - dx; // Var de decisão para o pixel 1

        var incL = 2 * dy; // 2 * alfa
        var incNe = 2 * (dy - dx); // 2 * (alfa + beta)

        var x = xi;
        var y = yi;
        
        color_buffer.putPixel(-x, y, color_0); // desfaz transformação

        // é utilizado na hora de interporlar 
        var dist = xf - x - 1;
        var i = 0;

        while(x < xf){
            if(d <= 0){
                d += incL; // caminhar para a direita (leste)
                x++;
            }else{
                d += incNe; // caminhar em diagonal (Nordeste)
                x++;
                y++;
            }
            //interpolação
            i++;
            var grad_color = [];
            grad_color.push(color_0[0] +(color_1[0]- color_0[0])* i/dist);// R
            grad_color.push(color_0[1] + (color_1[1]- color_0[1])* i/dist);// G
            grad_color.push(color_0[2] + (color_1[2]- color_0[2])* i/dist);// B
            grad_color.push(255);// ALPHA
            color_buffer.putPixel(-x, y, grad_color); // desfaz transformação
        }
    }else if((0 < m && m <= 1) && (xi > xf)){// quinto octante
        // Transformações
        let auxX;
        auxX = xi;
        xi = xf;
        xf = auxX;

        let auxY;
        auxY = yi;
        yi = yf;
        yf = auxY;

        dx = xf - xi;
        dy = yf - yi;

        var d = 2 * dy - dx; // Var de decisão para o pixel 1

        var incL = 2 * dy; // 2 * alfa
        var incNe = 2 * (dy - dx); // 2 * (alfa + beta)

        var x = xi;
        var y = yi;

       
        //deve-se inverter a ordem das cores
        color_buffer.putPixel(x, y, color_1); // igual o primeiro  octante

        // é utilizado na hora de interporlar 
        var dist = xf - x - 1;
        var i = 0;

        while(x < xf){
            if(d <= 0){
                d += incL; // caminhar para a direita (leste)
                x++;
            }else{
                d += incNe; // caminhar em diagonal (Nordeste)
                x++;
                y++;
            }
            //interpolação
            i++;
            var grad_color = [];
            grad_color.push(color_1[0] +(color_0[0]- color_1[0])* i/dist);// R
            grad_color.push(color_1[1] + (color_0[1]- color_1[1])* i/dist);// G
            grad_color.push(color_1[2] + (color_0[2]- color_1[2])* i/dist);// B
            grad_color.push(255);// ALPHA
            color_buffer.putPixel(x, y, grad_color); // igual o primeiro  octante
        }

    }else if((m > 1) && (yi > yf)){ // sexto octante
        // Reflete para o segundo e do segundo para o primeiro
        // Transformações
        // troca o inicio pelo fim e o fim pelo inicio
        let auxX;
        auxX = xi;
        xi = xf;
        xf = auxX;
        let auxY;
        auxY = yi;
        yi = yf;
        yf = auxY;

        // troca os valores de xi e yi
        let aux1;
        aux1 = xi;
        xi = yi;
        yi = aux1;
        // troca de valores de xf e yf
        let aux2;
        aux2 = xf;
        xf = yf;
        yf = aux2;

        dx = xf - xi;
        dy = yf - yi;

        var d = 2 * dy - dx; // Var de decisão para o pixel 1

        var incL = 2 * dy; // 2 * alfa
        var incNe = 2 * (dy - dx); // 2 * (alfa + beta)

        var x = xi;
        var y = yi;

       
        //inverte cores
        color_buffer.putPixel(y, x, color_1);  // desfaz transformação

        // é utilizado na hora de interporlar 
        var dist = xf - x - 1;
        var i = 0;

        while(x < xf){
            if(d <= 0){
                d += incL; // caminhar para a direita (leste)
                x++;
            }else{
                d += incNe; // caminhar em diagonal (Nordeste)
                x++;
                y++;
            }
            //interpolação
            i++;
            var grad_color = [];
            //inverte cores
            grad_color.push(color_1[0] +(color_0[0]- color_1[0])* i/dist);// R
            grad_color.push(color_1[1] + (color_0[1]- color_1[1])* i/dist);// G
            grad_color.push(color_1[2] + (color_0[2]- color_1[2])* i/dist);// B
            grad_color.push(255);// ALPHA
            color_buffer.putPixel(y, x, grad_color);  // desfaz transformação
        }



    }else if((m < -1) && (yi > yf)){ // setimo octante
        // Transformações
        //(x,-y)
        yi = -yi;
        yf = -yf;
        
        // troca os valores de xi e yi
        let aux1;
        aux1 = xi;
        xi = yi;
        yi = aux1;
        // troca de valores de xf e yf
        let aux2;
        aux2 = xf;
        xf = yf;
        yf = aux2;

        dx = xf - xi;
        dy = yf - yi;

        var d = 2 * dy - dx; // Var de decisão para o pixel 1

        var incL = 2 * dy; // 2 * alfa
        var incNe = 2 * (dy - dx); // 2 * (alfa + beta)

        var x = xi;
        var y = yi;
        
        color_buffer.putPixel(y, -x, color_0); //desfaz transformação

        // é utilizado na hora de interporlar 
        var dist = xf - x - 1;
        var i = 0;
        while(x < xf){
            if(d <= 0){
                d += incL; // caminhar para a direita (leste)
                x++;
            }else{
                d += incNe; // caminhar em diagonal (Nordeste)
                x++;
                y++;
            }
            //interpolação
            i++;
            var grad_color = [];
            grad_color.push(color_0[0] +(color_1[0]- color_0[0])* i/dist);// R
            grad_color.push(color_0[1] + (color_1[1]- color_0[1])* i/dist);// G
            grad_color.push(color_0[2] + (color_1[2]- color_0[2])* i/dist);// B
            grad_color.push(255);// ALPHA
            color_buffer.putPixel(y, -x, grad_color); //desfaz transformação
        }



    }else if((-1 <= m && m < 0) && xf > xi){ // oitavo octante
        // Transformações
        //(x,-y)
        yi = -yi;
        yf = -yf;
        dx = xf - xi;
        dy = yf - yi;

        var d = 2 * dy - dx; // Var de decisão para o pixel 1

        var incL = 2 * dy; // 2 * alfa
        var incNe = 2 * (dy - dx); // 2 * (alfa + beta)

        var x = xi;
        var y = yi;
        
        color_buffer.putPixel(x,-y, color_0); // desfaz transformação
        

        // é utilizado na hora de interporlar 
        var dist = xf - x - 1;
        var i = 0;
        while(x < xf){
            
            if(d <= 0){
                d += incL; // caminhar para a direita (leste)
                x++;
            }else{
                d += incNe; // caminhar em diagonal (Nordeste)
                x++;
                y++;
            }
            // interpolação
            i++;
            var grad_color = [];
            grad_color.push(color_0[0] +(color_1[0]- color_0[0])* i/dist);// R
            grad_color.push(color_0[1] + (color_1[1]- color_0[1])* i/dist);// G
            grad_color.push(color_0[2] + (color_1[2]- color_0[2])* i/dist);// B
            grad_color.push(255);// ALPHA
            color_buffer.putPixel(x,-y, grad_color); // desfaz transformação
        }
    }
    
}


function DrawTriangle(x0,y0,x1,y1,x2,y2,color_0,color_1,color_2){
   
    MidPointLineAlgorithm(x0,y0,x1,y1,color_0, color_1);
    MidPointLineAlgorithm(x1,y1,x2,y2,color_1,color_2);
    MidPointLineAlgorithm(x2,y2,x0,y0,color_2, color_0);

}

function DrawCircle(xc, yc, r, color_0){
    var d = 1-r;                                                        //variável de decisão
    var y = r;
    var x = 0;
    
    color_buffer.putPixel(xc + x, yc + y, color_0);                 //imprime os pontos sobre as retas x e y
    color_buffer.putPixel(xc + y, yc + x, color_0);                 //imprime os pontos sobre as retas x e y
    color_buffer.putPixel(xc - y, yc - x, color_0);                 //imprime os pontos sobre as retas x e y
    color_buffer.putPixel(xc - x, yc - y, color_0);                 //imprime os pontos sobre as retas x e y

    while(x <= y){

        if(d <= 0){                                                 //anda para o lado
            x++;
            d += (2 * x + 1);
        }else{                                                      //anda pra baixo
            y--;
            x++;
            d += (2* (x - y) + 1);
        }

        //daqui pra baixo imprime os pontos em todos
        //os octantes
        
        color_buffer.putPixel(xc + y, yc + x, color_0); // 1
        color_buffer.putPixel(xc + x, yc + y, color_0); // 2            
        color_buffer.putPixel(xc - x, yc + y, color_0); // 3 
        color_buffer.putPixel(xc - y, yc + x, color_0); // 4
        color_buffer.putPixel(xc - y, yc - x, color_0); // 5
        color_buffer.putPixel(xc - x, yc - y, color_0); // 6
        color_buffer.putPixel(xc + x, yc - y, color_0); // 7
        color_buffer.putPixel(xc + y, yc - x, color_0); // 8
        
    }

}
