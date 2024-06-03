import { StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
    tab: {
        backgroundColor: theme.colors.appBarBackground,
        color: theme.colors.appBarText,
    },
});

const AppBarTab = ({ name }) => {
    return (
        <Pressable>
            <Text style={styles.tab} fontSize='subheading' fontWeight='bold'>{name}</Text>
        </Pressable>
    );
};

export default AppBarTab;
