import { AppColors } from "assets/AppColors";
import { StyleSheet } from "react-native";

export const GStyles=StyleSheet.create({
    Flex:{
        flex:1,
        backgroundColor:AppColors.DarkBG
    },
    FlexRow:{
        flexDirection:"row"
    },
    FlexColumn:{
        flexDirection:"column"
    },
    FlexRowCenter:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    Center:{
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"center"
    },

})