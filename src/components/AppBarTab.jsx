import { StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
    tab: {
        backgroundColor: theme.colors.appBarBackground,
        color: theme.colors.appBarText,
        padding: 16,
    },
});

const AppBarTab = ({ name, route }) => {
    return (
        <Pressable>
            <Link to={route}>
                <Text style={styles.tab} fontSize='subheading' fontWeight='bold'>{name}</Text>
            </Link>
        </Pressable>
    );
};

export default AppBarTab;
