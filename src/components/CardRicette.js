import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
const CardRicette = () =>{
    return(
<Card className="card">
        <CardHeader 
        title="Paella con Gamberi" 
        subheader="Primi Piatti"    
        />
        <CardMedia
        className="card-media"
          image="https://media.soscuisine.com/images/recettes/large/1079.jpg"
          title="Paella"
        />
         <CardContent>
            <div>
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </div>
      </CardContent>
      </Card>
    );
};

export default CardRicette;