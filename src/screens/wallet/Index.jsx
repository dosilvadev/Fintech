import React, { Fragment ,useState} from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "react-native";
import { TouchableOpacity } from "react-native";
import { MaterialIcons, MaterialCommunityIcons,  AntDesign ,Octicons, Feather, Foundation, SimpleLineIcons} from "@expo/vector-icons";
import { Image } from "react-native";
import { Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { Animated, Easing } from "react-native";

const screenWidth = Dimensions.get('window').width;


export default function WalletScreen() {

    return (
        <Feed style={[{height:'100%'}]}/>
    );
}
function Feed(){
    // Sugestão de melhorias para a tela:
    // - Adicionar um resumo rápido dos ativos (ações, FIIs, renda fixa, etc)
    // - Mostrar gráfico de evolução do patrimônio
    // - Listar últimas movimentações ou aportes
    // - Atalhos para adicionar novo investimento ou resgatar
    // - Exibir dicas ou notícias financeiras

    // Mensagens para o carrossel de dicas
    const dicas = [
        "Diversifique seus investimentos para reduzir riscos e aumentar as chances de bons retornos!",
        "Invista regularmente, mesmo que com pequenos valores, para aproveitar o poder dos juros compostos.",
        "Tenha uma reserva de emergência antes de buscar investimentos mais arriscados.",
        "Revise seus objetivos financeiros periodicamente e ajuste sua carteira conforme necessário.",
        "Evite tomar decisões com base em emoções. Mantenha o foco no longo prazo."
    ];
    const [dicaIndex, setDicaIndex] = useState(0);

    // Avança para a próxima dica (loop)
    const nextDica = () => {
        setDicaIndex((prev) => (prev + 1) % dicas.length);
    };
    // Volta para a dica anterior (loop)
    const prevDica = () => {
        setDicaIndex((prev) => (prev - 1 + dicas.length) % dicas.length);
    };

    return(
        <Container style={[styles.container, {height:'100%'}]}>
            <Header/>
            <ScrollView style={{flex: 1, height:'100%'}} showsVerticalScrollIndicator={false}>
                {/* Dicas financeiras - Carrossel */}
                <Container>
                    <Titulo texto="Dica do dia" color="#888" size={15} />
                    <Container style={{backgroundColor: "#181818", borderRadius: 10, padding: 16, marginTop: 8, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity onPress={prevDica} style={{padding: 8}}>
                            <MaterialIcons name="chevron-left" size={28} color="#888" />
                        </TouchableOpacity>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Text style={{color: "#fff", textAlign: 'center'}}>{dicas[dicaIndex]}</Text>
                        </View>
                        <TouchableOpacity onPress={nextDica} style={{padding: 8}}>
                            <MaterialIcons name="chevron-right" size={28} color="#888" />
                        </TouchableOpacity>
                    </Container>
                    {/* Indicadores de página */}
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 6, gap: 4}}>
                        {dicas.map((_, idx) => (
                            <View
                                key={idx}
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: dicaIndex === idx ? '#029b39' : '#444'
                                }}
                            />
                        ))}
                    </View>
                </Container>
                <CardMeta meta={100000} acumulado={18300} />
                
                {/* Atalhos rápidos */}
                <Container style={{marginTop: 24, flexDirection: "row", gap: 16, justifyContent: "space-between"}}>
                    <TouchableOpacity style={{flex: 1, backgroundColor: "#029b39", borderRadius: 10, padding: 16, alignItems: "center"}}>
                        <Icone lib="Feather" name="plus-circle" size={24} color="#fff" />
                        <Text style={{color: "#fff", marginTop: 6}}>Novo Aporte</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, backgroundColor: "#232323", borderRadius: 10, padding: 16, alignItems: "center"}}>
                        <Icone lib="Feather" name="download" size={24} color="#fff" />
                        <Text style={{color: "#fff", marginTop: 6}}>Resgatar</Text>
                    </TouchableOpacity>
                </Container>
                 {/* Resumo rápido dos ativos */}
                <Container style={{marginTop: 16}}>
                    <Titulo texto="Resumo dos Ativos" color="#888" size={15} />
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 8}}>
                        <Container style={{flexDirection: "row", gap: 12}}>
                            <Buttom texto="Ações" colorText="#fff" sizeText={14} iconeLib="Feather" iconeName="trending-up" iconeSize={24} iconeColor="#4caf50" />
                            <Buttom texto="FIIs" colorText="#fff" sizeText={14} iconeLib="Feather" iconeName="home" iconeSize={24} iconeColor="#ff9800" />
                            <Buttom texto="Renda Fixa" colorText="#fff" sizeText={14} iconeLib="Feather" iconeName="dollar-sign" iconeSize={24} iconeColor="#2196f3" />
                            <Buttom texto="Cripto" colorText="#fff" sizeText={14} iconeLib="Feather" iconeName="hexagon" iconeSize={24} iconeColor="#9c27b0" />
                        </Container>
                    </ScrollView>
                </Container>
                {/* Últimas movimentações */}
                <Container style={{marginTop: 24}}>
                    <Titulo texto="Últimas movimentações" color="#888" size={15} />
                    <Container style={{marginTop: 8, gap: 10}}>
                        <Container style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                            <Icone lib="Feather" name="arrow-down-circle" size={20} color="#4caf50" />
                            <Text style={{color: "#fff"}}>Aporte de R$ 500,00 em Ações</Text>
                        </Container>
                        <Container style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                            <Icone lib="Feather" name="arrow-up-circle" size={20} color="#ff695a" />
                            <Text style={{color: "#fff"}}>Resgate de R$ 200,00 em FIIs</Text>
                        </Container>
                        {/* ...adicione mais exemplos ou integre com dados reais */}
                    </Container>
                </Container>
                {/* Gráfico de evolução do patrimônio
                <Container style={{marginTop: 24, marginBottom: 16}}>
                    <Titulo texto="Evolução do Patrimônio" color="#888" size={15} />
                    {/* Aqui você pode integrar um gráfico de linha, ex: VictoryChart, react-native-svg-charts, etc */}
                    {/* <View style={{
                        height: 120,
                        backgroundColor: "#181818",
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 8
                    }}>
                        <Text style={{color: "#666"}}>Gráfico em breve...</Text>
                    </View>
                </Container> */}
            </ScrollView>
            <Options/>
        </Container>
    )
}

function Options() {
    const [open, setOpen] = useState(false);
    const rotateAnim = React.useRef(new Animated.Value(0)).current;

    // Animação de rotação
    const animateRotation = (toValue) => {
        Animated.timing(rotateAnim, {
            toValue,
            duration: 300,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();
    };

    const handlePress = () => {
        if (!open) {
            animateRotation(1); // gira para frente
        } else {
            animateRotation(0); // volta ao início
        }
        setOpen(!open);
    };

    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '135deg'], // ajuste o ângulo como quiser
    });

    const options = [
        {
            texto: "Simulação",
            iconeLib: "MaterialIcons",
            iconeName: "calculate",
            onPress: () => {
                // ação de simulação
            }
        },
        {
            texto: "Calculadora",
            iconeLib: "Feather",
            iconeName: "percent",
            onPress: () => {
                // ação de calculadora
            }
        },
        // Adicione mais opções aqui
    ];

    return (
        <View style={{
            position: 'absolute',
            bottom: 70,
            right: 0,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            zIndex: 100
        }}>
            {options.map((opt, idx) => {
                // Animação de surgimento para cada opção
                const animatedValue = React.useRef(new Animated.Value(0)).current;

                React.useEffect(() => {
                    if (open) {
                        Animated.timing(animatedValue, {
                            toValue: 1,
                            duration: 300 + idx * 60, // efeito cascata
                            useNativeDriver: true,
                        }).start();
                    } else {
                        Animated.timing(animatedValue, {
                            toValue: 0,
                            duration: 200,
                            useNativeDriver: true,
                        }).start();
                    }
                }, [open]);

                return (
                    <Animated.View
                        key={idx}
                        style={{
                            opacity: animatedValue,
                            transform: [
                                {
                                    translateY: animatedValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [20, 0], // sobe ao aparecer
                                    }),
                                },
                                {
                                    scale: animatedValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.8, 1],
                                    }),
                                },
                            ],
                            marginBottom: open ? 16 : 0,
                        }}
                    >
                        {open && (
                            <TouchableOpacity
                                style={{
                                    width: 150,
                                    height: 50,
                                    backgroundColor: '#232323',
                                    borderRadius: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    elevation: 4
                                }}
                                onPress={opt.onPress}
                                activeOpacity={0.8}
                            >
                                <Icone lib={opt.iconeLib} name={opt.iconeName} size={22} color="#fff" />
                                <Text style={{ color: '#fff', marginLeft: 10, fontWeight: 'bold' }}>{opt.texto}</Text>
                            </TouchableOpacity>
                        )}
                    </Animated.View>
                );
            })}
            <TouchableOpacity
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: '#029b39',
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 6
                }}
                onPress={handlePress}
                activeOpacity={0.8}
            >
                <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                    <Icone name={"setting"} lib={'AntDesign'} size={32} color="#fff" />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
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
        <View style= {{height:10}}>
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