import React, { Fragment } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "react-native";
import { TouchableOpacity } from "react-native";
import { MaterialIcons, MaterialCommunityIcons,  AntDesign ,Octicons, Feather, Foundation, SimpleLineIcons} from "@expo/vector-icons";
import { Image } from "react-native";
import { Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
const screenWidth = Dimensions.get('window').width;


export default function WalletScreen() {

    return (
        <Feed/>
    );
}
function Feed(){
    return(
        <View style={styles.container}>
          <Header/>
          <CardMeta  meta={100000} acumulado={18300} />
          <Container style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Buttom  texto={'Negociado'} colorText={'#cacaca'} sizeText={14} iconeName='plus' iconeLib='AntDesign' iconeSize={24} iconeColor={'#fbc105'} />
            <Buttom texto={'Posição'} colorText={'#cacaca'} sizeText={14} iconeName='pie-chart' iconeLib='Feather' iconeSize={24} iconeColor={'#fbc105'}/>
            <Buttom texto={'Dividendo'} colorText={'#cacaca'} sizeText={14} iconeName='attach-money' iconeLib='MaterialIcons' iconeSize={24} iconeColor={'#fbc105'}/>
            <Buttom texto={'Notas'} colorText={'#cacaca'} sizeText={14} iconeName='note' iconeLib='SimpleLineIcons' iconeSize={24} iconeColor={'#fbc105'}/>
          </Container>
          
       </View>
    )
}

function Buttom ({texto, colorText,sizeText, iconeLib, iconeName, iconeSize, iconeColor}){
    return(
        <Container style={{alignItems:'center', justifyContent:'center', gap:5}} >
            <TouchableOpacity>
                <Container style={{width:75, height:50, elevation:4, borderRadius:10,backgroundColor:'#1f1f1f',justifyContent:'center', alignItems:'center'}}>
                    <Icone lib={iconeLib} name={iconeName} size={iconeSize} color={iconeColor} />
                </Container>
            </TouchableOpacity>
            <Titulo texto={texto} color={colorText} size={sizeText} styles={{fontWeight:'900'}}/>
        </Container>
    )
}

function Icone({name, lib, size, color}) {
    // Escolhe o componente de ícone com base na prop lib usando objeto de tipos
    const iconTypes = {
        AntDesign,
        MaterialCommunityIcons,
        MaterialIcons,
        Octicons,
        Feather,
        Foundation,
        SimpleLineIcons
    };
    const IconComponent = iconTypes[lib] || MaterialIcons;

    if (!IconComponent) return null;

    return (
        <IconComponent name={name} size={size} color={color} />
    );
}

// Função para simplificar valores grandes (ex: 1000000 -> 1 mi)
function simplificarValor(valor) {
    if (typeof valor !== "number") return '---';
    if (valor >= 1_000_000_000) return (valor / 1_000_000_000).toFixed(2).replace(/\.00$/, "");
    if (valor >= 1_000_000) return (valor / 1_000_000).toFixed(2).replace(/\.00$/, "");
    if (valor >= 1_000) return (valor / 1_000).toFixed(2).replace(/\.00$/, "");
    return valor;
}

function ConvertToReal(valor) {
    if (valor == null || isNaN(valor)) {
        return "R$ ---";
    }
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
function CardMeta ({meta, acumulado}) {
    function getSufixo(valor) {
       if (typeof valor !== "number") return "";
       if (valor >= 1_000_000_000) return "bi";
       if (valor >= 1_000_000) return "mi";
       if (valor >= 1_000) return "mil";
       if (valor > 1 && valor < 1_000) return "reais";
       if (valor == 1) return "real";
       return "";
    }

    return (
        <Container style={{ gap: 20 }}>
            <Container>
                <Titulo texto="RESUMO DA CARTEIRA" color="#888" size={15} />
                <Container style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <SubTitulo texto={`Rumo aos ${simplificarValor(meta)} ${getSufixo(meta)} `} color={"#fff"} size={24} />
                    <Icone name="arrow-forward-ios" lib="MaterialIcons" color="#fff" size={16} />
                </Container>
            </Container>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    flexDirection: "row",
                    gap: 16,
                    paddingLeft: 20, // compensa o paddingHorizontal do container externo
                    marginLeft: 0,  // puxa para esquerda
                }}
                style={{ marginHorizontal: -20 }} // faz o scroll ocupar toda a largura
            >
            <Card patrimonio={acumulado} meta={meta}/>
            </ScrollView>
        </Container>
    )
}


function Card({patrimonio, meta}) {
    return (
        <Container style={{ flexDirection: 'row', width:340, gap: 20, justifyContent: 'space-between', elevation: 5, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 20, alignItems: 'center', backgroundColor: '#1f1f1f' }}>
            <Container style={{ gap: 10 }}>
                <Container style={{ gap: 10 }}>
                    <Container style={{ backgroundColor: '#029b3944', width: 40, height: 40, justifyContent: 'center', alignItems: 'center', elevation: 3, borderRadius: 2 }} >
                        <Icone name='graph' lib='Octicons' color='#029b39' size={28} />
                    </Container>
                    <Titulo texto={'Patrimônio'} color="#fff" />
                </Container>
                <Container>
                    <Titulo texto={'Total acumulado'} color="#888" size={16} />
                    <Titulo texto={ConvertToReal(patrimonio)} color='#fff' />
                </Container>
            </Container>
            <GraficoProgress valor={patrimonio} meta={meta} />
        </Container>
    )
}

function Titulo({texto, color, size = 18, styles}){
    return (
        <Text style={[{fontSize:size, color:color}, styles]}>{texto}</Text>
    )
}

function GraficoProgress({ meta = 0, valor = 0 }) {
    // valor: valor acumulado, meta: valor da meta
    const progress = meta > 0 ? valor / meta : 0;
    const percent = (progress * 100).toFixed(2);

    return (
        <Progress.Circle
            size={150}
            progress={progress} // entre 0 e 1
            showsText={true}
            color="#029b39"
            unfilledColor="#444"
            borderWidth={0}
            thickness={14} // aumenta a espessura do círculo
            formatText={() => `${percent}%`}
            textStyle={{ color: '#fff' }}
        />
    );
}

// Agora aceita prop style e faz merge com o style interno
function Container({ children,  style }) {
    return(
         <View style={[ style]}>
            {children}
         </View>
    )
}





function SubTitulo({texto, color, size = 18}){

    return (
        <Text style={{fontSize:size, color:color}}>{texto}</Text>
    )
}

// function Carrosel(){

// }
function Header (){
    // Adicione os imports necessários

    // Importa o componente Image do react-native

    return (
        <View style= {{}}>
            <StatusBar barStyle="light-content" backgroundColor="#121212" />
            <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center'}}>
                <View  style={{flexDirection:"row", alignItems:'center', gap:10}} >
                    <View style={{backgroundColor:'#fff', height:40, width:40, borderRadius:20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center'}}>
                        <Image
                            source={require('../../../assets/img/logo.png')}
                            style={{width: 40, height: 40, borderRadius: 20}}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={{flexDirection:'row'}} >
                        <Text style={{color:'#fff', fontWeight:'bold', fontSize:18}}>Olá,</Text>
                        <Text style={{color:'#888',  fontSize:18}}> Daniel Oliveira</Text>
                    </View>
                </View>
                <View  style={{flexDirection:'row', alignItems:'center', gap:10}}>
                    <TouchableOpacity>
                        <MaterialIcons name='visibility-off' size={24}  color='#cacaca'/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialCommunityIcons 
                            name="bell-badge-outline" 
                            size={24} 
                            color='#cacaca'
                        />

                        <View style={{
                            position: 'absolute',
                            top: 2,
                            right: 2,
                            backgroundColor: '#ff695a', // cor desejada
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: '#121212'
                        }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

function CardWollet(){
    return (
        <View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        paddingHorizontal:20, paddingVertical:20,
        gap:32
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 24,
        color:'#cacaca'
    },
    balanceLabel: {
        fontSize: 18,
        color: "#888",
    },
    balanceValue: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#2ecc71",
        marginTop: 8,
    },
});