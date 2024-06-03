import { View } from "react-native";
import Text from "./Text";

const StatBox = ({ title, number }) => {
    let numberText;
    if (number >= 1000) {
        numberText = `${(number / 1000).toFixed(1)}k`;
    } else {
        numberText = `${number}`;
    }

    return (
        <View style={{ alignItems: 'center' }}>
            <Text fontWeight='bold'>{numberText}</Text>
            <Text color='textSecondary'>{title}</Text>
        </View>
    );
};

export default StatBox;
