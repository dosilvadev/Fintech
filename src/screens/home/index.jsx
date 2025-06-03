import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView,Linking, TextInput } from "react-native";
import { StatusBar } from "react-native";
import {MaterialIcons, AntDesign, MaterialCommunityIcons} from   'react-native-vector-icons';
import { LineChart } from 'react-native-chart-kit';

export default function HomeScreen() {

    return (
        <View style={{height:'100%', backgroundColor:'#121212'}}>
            <StatusBar barStyle="light-content" backgroundColor="#121212" />
            <Header />
            <Feed/>
            
        </View>
    );
}

function GraficoLine() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                strokeWidth: 2,
            },
        ],
    };

    const chartConfig = {
        backgroundGradientFrom: '#121212',
        backgroundGradientTo: '#121212',
        fillShadowGradient: 'transparent',          // Remove preenchimento
        fillShadowGradientOpacity: 0,                // Remove preenchimento
        color: () => 'rgba(251, 193, 5, 1)',
        labelColor: () => '#fbc105',
    };
   

    return (
        <View>
            <LineChart
                data={data}
                width={360}
                height={160}
                chartConfig={chartConfig}
                bezier
                withInnerLines={false} 
                withDots={false}
                withShadow={false}
                withHorizontalLabels ={false}
                withHorizontalLines ={false}
                 withLabels={true}
                withVerticalLines ={false}
                style={{ width:'100%', justifyContent:'center' , padding:0, marginRight:20 }}
            />
        </View>
    );
}

// function GraficoBarra() {
//     const data = {
//         labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
//         datasets: [
//             {
//                 data: [20, 45, 28, 80, 99, 43],
//             },
//         ],
//     };

//     const chartConfig = {
//         backgroundGradientFrom: '#121212',
//         backgroundGradientTo: '#121212',
//         fillShadowGradient: '#fbc105',
//         fillShadowGradientOpacity: 1,
//         color: () => 'rgba(251, 193, 5, 1)',
//         labelColor: () => '#fbc105',
//         barPercentage: 0.6,
//     };

//     return (
//         <View>
//             <BarChart
//                 data={data}
//                 width={360}
//                 height={220}
//                 chartConfig={chartConfig}
//                 fromZero
//                 showBarTops={false}
//                 withInnerLines={false}
//                 withHorizontalLabels={false}
//                 withVerticalLines={false}
//                 style={{
//                     marginRight: 20,
//                     borderRadius: 16,
//                 }}
//             />
//         </View>
//     );
// }




function Header() {
    return (
        <View style={{flexDirection:'row', justifyContent:'flex-end', gap:24, alignItems: 'center', paddingVertical:10,  paddingHorizontal:20}}>
            <View style={{flexDirection:'row',justifyContent: 'center', alignItems:'center', width:'70%'}}>
                <Text style={Themes.dark.title}>Investimentos</Text>
            </View>
            <View >
                <TouchableOpacity>
                  <MaterialIcons name='visibility-off' size={24}  color='#cacaca'/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function Feed() {
    return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <View style={{gap:32}}>
            <DashBoard />
            <ListaAtivos/>
        </View>
    </ScrollView>
    );
}

function DashBoard (){
    return (
         <View style={{gap:1, flex: 1,  paddingHorizontal:20}}>
             <Text style={[Themes.dark.text, {fontSize:16, fontWeight:'400'}]}>
                    Total Investido
                </Text>
            <View>
                <Text style={[Themes.dark.title,{fontSize:26, fontWeight:'Bold'}]}>
                    R$ 18.343,32
                </Text>
                <View style={{flexDirection:'row', gap: 5}}>
                    <AntDesign name="caretdown" size={14} color='#ff695a'></AntDesign>
                    {/* <AntDesign name="caretup" size={16} color='#029b39'></AntDesign> */}
                    <Text style={{color:'#ff695a', fontSize:14}}>
                        R$ 32,66 
                        <Text style={{fontWeight:'300'}}>  (27,57%)<Text style={{color:'grey'}}>    até 27/10/2025</Text></Text>
                    </Text>
                </View>
              </View>
            <GraficoLine/>
            {/* <GraficoBarra /> */}
           
            
        </View>
    )
}
function Filtro({ name, width = 120, icon, iconLib = 'MaterialIcons', iconColor = '#fff', iconSize = 18, select = true, onPress }) {
    // Escolhe o componente de ícone com base na prop iconLib usando objeto de tipos
    const iconTypes = {
        AntDesign,
        MaterialCommunityIcons,
        MaterialIcons,
    };
    const IconComponent = iconTypes[iconLib] || MaterialIcons;

    return (
        <TouchableOpacity onPress={onPress} >
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#cacaca',
                alignItems: 'center',
                borderRadius: 20,
                width: width,
                paddingHorizontal: 5,
                paddingVertical: 8,
                backgroundColor: select ? 'rgba(202,202,202,0.3)' : '#121212',
                elevation:4
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    {icon && <IconComponent name={icon} size={iconSize} color={iconColor} />}
                    <Text style={{ color: '#fff', fontSize:12 }}>{name}</Text>
                </View>
                {select ? <MaterialIcons name='keyboard-arrow-down' size={16} color='#fff' /> : ''}
            </View>
        </TouchableOpacity>
    );
}

function Filtros({selectFiltro, setSelecFiltro}){
   
    return (
    <View style={{ marginLeft:20}}>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flexDirection: "row", gap: 16, alignItems: 'center' }}
                >
                    <Filtro
                        name='Favoritos'
                        width={100}
                        select={selectFiltro === 'Favoritos'}
                        onPress={() => setSelecFiltro('Favoritos')}
                    />
                    <Filtro
                        name='Maiores Altas'
                        width={150}
                        icon="trending-up"
                        iconLib="MaterialCommunityIcons"
                        iconColor="#cacaca"
                        select={selectFiltro === 'Maiores Altas'}
                        onPress={() => setSelecFiltro('Maiores Altas')}
                    />
                    <Filtro
                        name='Maiores baixas'
                        width={150}
                        icon="trending-down"
                        iconLib="MaterialCommunityIcons"
                        iconColor="#cacaca"
                        select={selectFiltro === 'Maiores baixas'}
                        onPress={() => setSelecFiltro('Maiores baixas')}
                    />
                </ScrollView>
            </View>
    )
}

function Searcher({onChangeText}){
    return (
        <View style={{paddingHorizontal:20}}>
        <View style={{backgroundColor:'#1f1f1f', elevation:5,flexDirection:'row', justifyContent:'space-between',gap:5, borderRadius:25, alignItems:'center', paddingHorizontal:20}} >
            <View style={{justifyContent:'center'}}>
                <AntDesign name='search1' size={20} color='#cacaca'/>
            </View>
            <TextInput
                onChangeText={text => onChangeText(text.toUpperCase())}
                style={{ width:'90%', fontSize:16, color:'#cacaca' }}
                placeholder="Pesquisar ativo"
                placeholderTextColor="#cacaca"
                autoCapitalize="characters"
            />
        </View>
        </View>
    )
}

function ListaAtivos() {
    const [selectFiltro, setSelecFiltro] = useState('');
    const [chaveBusca, setChaveBusca] = useState('');
    const data = [
        {
            name: 'HTMX',
            descricao: 'Fii Maxi Ci',
            ultimaAtualizacao: '16:43:34',
            precoMedio: 8.65,
            precoAtual: 8.77
        },
        {
            name: 'ABCD',
            descricao: 'Fundo Imobiliário',
            ultimaAtualizacao: '15:20:10',
            precoMedio: 10.00,
            precoAtual: 10.50
        },
        {
            name: 'XPTO',
            descricao: 'Ação XPTO',
            ultimaAtualizacao: '14:10:05',
            precoMedio: 20.00,
            precoAtual: 19.80
        },
        {
            name: 'SNEL11',
            descricao: 'FII Suno Energias Limpas',
            ultimaAtualizacao: '14:10:05',
            precoMedio: 10.00,
            precoAtual: 19.80
        }
    ];

    const ativosFiltrados = data.filter(
        ativo =>
            ativo.name.toUpperCase().includes(chaveBusca.toUpperCase())
    );

    return (
        <View style={{gap:16}}>
            <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20}}>
                <Text style={{color:'#cacaca', fontSize:16}}>Meus Ativos</Text>
                <TouchableOpacity>
                    <View style={{flexDirection:'row', alignItems:"center", gap:5}}>
                        <Text style={{color:'#ffff', fontWeight:'bold'}}>Lista completa</Text>
                        <AntDesign name='arrowright' color='#fbc105' size={15}></AntDesign>
                    </View>
                </TouchableOpacity>
            </View>
            <Searcher onChangeText={setChaveBusca} />
            <Filtros selectFiltro={selectFiltro} setSelecFiltro={setSelecFiltro} />
            <View style={{ gap: 20, paddingBottom: 20 , paddingHorizontal:20}}>
                {ativosFiltrados.map((ativo, idx) => (
                    <CardStonk key={idx} ativo={ativo} />
                ))}
            </View>
        </View>
    );
}


function CardStonk ({ativo}){

    // Calcula a diferença de preço e percentual
    const diff = ativo.precoAtual - ativo.precoMedio;
    const diffPercent = ((diff / ativo.precoMedio) * 100).toFixed(2);
    const isUp = diff >= 0;

    return (
        <TouchableOpacity>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 24 }}>
                    <Icone />
                    <View>
                        <Text style={{ color: '#cacaca', fontSize: 20 }}>{ativo?.name || ''}</Text>
                        <Text style={{ color: '#cacaca', fontSize: 14, fontWeight: '100' }}>
                            {ativo?.descricao || ''}
                        </Text>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ color: '#cacaca', fontSize: 16, fontWeight: '700' }}>
                         R$ {ativo.precoMedio?.toFixed(2)} 
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <AntDesign
                            name={isUp ? 'arrowup' : 'arrowdown'}
                            size={18}
                            color={isUp ? '#029b39' :'#ff695a'}
                        />
                        <Text style={isUp ? colors.up : colors.down}>
                            R$ {Math.abs(diff).toFixed(2)}
                        </Text>
                        <Text> </Text>
                        <Text style={{ color: isUp ? '#029b39' : '#ff695a', fontSize: 14 }}>
                             ({Math.abs(diffPercent)}%)
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
function MinhaCarteira (){
    const abrirNubank = async () => {
        const urlApp = 'nubank://';
        const urlLoja = Platform.select({
            android: 'https://play.google.com/store/apps/details?id=com.nu.production',
            ios: 'https://apps.apple.com/br/app/nubank/id1052859705',
        });

        try {
            const supported = await Linking.canOpenURL(urlApp);

            if (supported) {
                await Linking.openURL(urlApp);
            } else {
                await Linking.openURL(urlLoja);
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível abrir o aplicativo ou a loja.');
        }
    };

    return(
        
        <View style={{backgroundColor:'#1f1f1f',  borderRadius:10, elevation:4}} >
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',paddingHorizontal:20, paddingVertical:20,}}>
                <View style={{flexDirection:'row', gap:10, alignItems:'center'}} >
                    <Text>Grafico</Text>
                    <View>
                        <Text style={{color:'#cacaca', fontWeight:'100',fontSize:12}} >Minha Carteira</Text>
                        <Text style={{fontWeight:'900', fontSize:18, color:'#cacaca'}}>R$ 0,00</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row', gap:5, alignItems:'center',backgroundColor:'#121212', paddingHorizontal:12,paddingVertical:5 , borderRadius:16}}>
                    <AntDesign name='caretdown' size={12} color='#ff695a'></AntDesign>
                    <Text style={{fontWeight:'bold', fontSize:14, color:'#ff695a'}}>27,8%</Text>
                </View>
            </View>
            <View style={{backgroundColor:'grey', height:1}}>
            </View>
            <TouchableOpacity onPress={abrirNubank}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:10, paddingVertical:10}}>
                    <Text style={{color:'#cacaca', fontSize:16}}>
                        Acessar Investimento
                    </Text>
                    <MaterialIcons name='arrow-forward-ios' size={16} color='#cacaca'/>
                </View>
            </TouchableOpacity>

        </View>
    )
}
function Icone(){
    return(
        <View style={{width:40, height:40, backgroundColor:'#cacaca', alignItems:'center', justifyContent:'center', borderRadius:5}} >
            <MaterialCommunityIcons name='finance' size={32} color='white'  />
        </View>
    );
}
const Themes = StyleSheet.create({
    dark: {
       
        title: {
            color: '#cacaca',
            fontSize: 24,
            fontWeight: '900'
        },
        text:{
            color:'#cacaca',
            fontSize: 14
        },
    },
});
const colors = StyleSheet.create({
    up: {
        color:'#029b39'
    },
    down:{
        color:'#ff695a'
    }
});
const iconName ={
    up: 'arrowup',
    down: 'arrowdown',
}