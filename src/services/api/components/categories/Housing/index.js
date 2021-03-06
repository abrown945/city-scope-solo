import teleport from '../../../teleport';
import {statFormat} from '../../../../utils';

export const fetchHousing = async urbanScores => {
    let chosenCity = urbanScores;

    let housing = {
        small: 0,
        medium: 0,
        large: 0
    }

    const fetchData = async urbanScores => {
        const chosenCity = urbanScores
        let small, medium, large;

        let cityDetails = await teleport.get(chosenCity);
        cityDetails = cityDetails.data["_links"]["ua:details"]["href"];

        let cityHousing = await teleport.get(cityDetails);
        cityHousing = cityHousing.data.categories.find(
          category => category.id.toUpperCase() === "HOUSING"
        );

        if(cityHousing === undefined) return;

        else {
            const checkForCorrectData = housingData => {
                let availableInfo = housingData;

                const dataIds = [
                  "APARTMENT-RENT-SMALL",
                  "APARTMENT-RENT-MEDIUM",
                  "APARTMENT-RENT-LARGE"
                ];

                const filteredData = availableInfo.data.filter(x => dataIds.includes(x.id))

                if(filteredData.length < 3) return false;
                else { return true}
            }

            if(checkForCorrectData(cityHousing)) {
                small = cityHousing.data.find(x => x.id === "APARTMENT-RENT-SMALL");
                medium = cityHousing.data.find(x => x.id === "APARTMENT-RENT-MEDIUM");
                large = cityHousing.data.find(x => x.id === "APARTMENT-RENT-LARGE");

                small = await statFormat(small.currency_dollar_value);
                medium = await statFormat(medium.currency_dollar_value);
                large = await statFormat(large.currency_dollar_value);

                housing = {
                small,
                medium,
                large
                };

                return housing;
            }
            else return;
        }
    }

    housing = await fetchData(chosenCity);

    return housing;
}