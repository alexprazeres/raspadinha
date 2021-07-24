<template>
<v-container fluid class="pa-0 ma-0">
    <v-app-bar app color="transparent" elevation="0" light>
        <v-app-bar-nav-icon class="white--text" @click="drawer = true"></v-app-bar-nav-icon>

    </v-app-bar>

    <v-container fluid v-if="iniciar" class="mx-auto mt-n12 ">
        <p>INICOU</p>
        <v-container fluid class="pa-0">
            <v-row class="text-center justify-center mt-5" v-for="(r,indexN) in arrNumeros" :key="indexN">
              
                <v-card  v-for="(n,indexItem) in arrNumeros[indexN]" :key="indexItem" class="pa-2 transparent" outlined>
                    
                    <b class="text-h3 white--text">{{ letras[n-1] }}</b>

                    <vue-scratchable :brushOptions="brush" :hideOptions="hide" v-slot="{ init }">
                       
                        <img v-if="arrPremiados.includes(n)" width="250px" :src="require('@/assets/raspadinha/ACERTO.png')" @load="init()">
                        <img v-else :src="require('@/assets/raspadinha/ERRO.png')" width="250px" @load="init()">
                    </vue-scratchable>
                </v-card>
            </v-row>

        </v-container>

    </v-container>

    <!-- MENU LATERAL -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list-item>

            <v-list-item-content>
                <v-list-item-title>RASPADINHA DA SORTE</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
            <v-list-item  link @click="reiniciarRaspadinha()">
                <v-list-item-icon>
                    <v-icon>mdi-restart</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>REINICIAR RASPADINHA</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <!-- DIALOGO INICIAR -->
    <v-dialog v-model="dialog" width="500" persistent>
        <v-card>
            <v-card-title class="text-h5 grey lighten-2">
                Iniciar Raspadinha da Sorte
            </v-card-title>

            <v-card-text class="">
                <v-img class="mx-auto" src="@/assets/logo.jpg" width="150"></v-img>
                <p><b class="text-h5">Por favor, defina os parâmetros iniciais:</b></p>
                <v-text-field name="linhas" label="Quantidade de Linhas" id="linhas" v-model="inputLinhas"></v-text-field>
                <v-text-field name="colunas" label="Quantidade de Colunas" id="colunas" v-model="inputColunas"></v-text-field>
                <v-text-field name="premiados" label="Quantidade de Premiados" id="premiados" v-model="inputPremiados"></v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="iniciarRaspadinha()">
                    INICIAR
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import $ from "jquery";

import paperPattern from '@/assets/raspadinha/RASPA.png';
// We declare it globally
window.$ = $;

export default {
    name: 'Principal',
    data: () => ({
        letras: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        index: 1,
        qtdTotalRaspadinhas: 1,
        inputLinhas: 3,
        inputColunas: 5,
        inputPremiados: 7,
        arrNumeros:[],
        arrPremiados: [],
        dialog: false,
        iniciar: false,
        drawer: null,        
        hide: {
          type: 'pattern',
          src: paperPattern,
          repeat: 'repeat',
        },
        brush: {
          size: 20,
          shape: 'round',
        },
    }),
    methods: {

      reiniciarRaspadinha(){
        this.drawer = false;
        this.iniciar = false;
        this.dialog = true;
      },
        iniciarRaspadinha() {
            var narr=[];
            this.index = 1;
            this.arrPremiados = [];
            let linhas = parseInt(this.inputLinhas);
            let colunas = parseInt(this.inputColunas);
            let premiados = parseInt(this.inputPremiados);

            this.qtdTotalRaspadinhas = (colunas * linhas);
            for (let index = 1; index <= this.qtdTotalRaspadinhas; index++) {
                narr.push(index);                
            }            
            while (this.arrPremiados.length < premiados) {
                let n = this.randomNum(1, this.qtdTotalRaspadinhas)
                if (!this.arrPremiados.includes(n)) {
                    this.arrPremiados.push(n);
                }
            }

            this.arrNumeros = this.splitToBulks(narr, colunas);            
            this.dialog = false;
            this.iniciar = true;
        },
        splitToBulks(arr, bulkSize = 20) {
            const bulks = [];
            for (let i = 0; i < Math.ceil(arr.length / bulkSize); i++) {
                bulks.push(arr.slice(i * bulkSize, (i + 1) * bulkSize));
            }
            return bulks;
        },
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    },
    mounted() {
        this.dialog = true;

        // You can use it now
        $('body').css('background-color', 'orange');
    }
}
</script>
