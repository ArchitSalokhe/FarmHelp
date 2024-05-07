import axios from 'axios';

const cropUrl = 'http://localhost:3002/recommend';

export class CropService {

    async getCrop(cropData) {
        console.log(cropData);
        return await axios.post(cropUrl, {
            cropData: cropData
        })
        .then(res => res.data)
        .catch(er => console.log(er.message));
        
    }

}