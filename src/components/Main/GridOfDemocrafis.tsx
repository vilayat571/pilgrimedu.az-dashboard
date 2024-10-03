import CountsOfParts from "./CountsOfParts";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/store/store";
import {
  faBlog,
  faGraduationCap,
  faQuestion,
  faUser,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

interface ICounts {
  count: number;
  text: string;
  path:string,
  icon: IconDefinition;
}

const GridOfDemocrafis = () => {
  const dispatch = useAppDispatch();

  // Initialize countsData as an array of ICounts objects
  const [countsData, setCountsData] = useState<ICounts[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("https://pilgrimbackend.onrender.com/api/v1/scholarships"),
      fetch("https://pilgrimbackend.onrender.com/api/v1/questions"),
      fetch("https://pilgrimbackend.onrender.com/api/v1/users"),
      fetch("https://pilgrimbackend.onrender.com/api/v1/blogs"),
    ])
      .then((responses) => {
        return Promise.all(responses.map((response) => response.json()));
      })
      .then((data) => {
        // Correct the wordsArray and icons
        const icons = [faGraduationCap, faQuestion, faUser, faBlog];
        const texts = [
          "Saytda olan toplam təqaüd proqramı:",
          "Saytda olan toplam sual proqramı:",
          "Saytda olan toplam istifadəçi proqramı:",
          "Saytda olan toplam bloq proqramı:",
        ];

        const paths = [
          "/teqaudler",
          "/suallar",
          "/users",
          "bloqlar",
        ];
        
        const newArray = data.map((item: ICounts, index: number) => {
          return {
            count: item.count,   
            text: texts[index],  
            icon: icons[index],  
            path:paths[index],

          };
        });
        setCountsData(newArray);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 gap-4 w-full mt-4">
      {countsData.length > 0 && // Check if countsData is not empty
        countsData.map((item: ICounts, index: number) => {
          return (
            <CountsOfParts
              key={index} // Ensure each item has a unique key
              text={item.text}
              path={item.path}
              count={item.count}
              icon={item.icon}
            />
          );
        })}
    </div>
  );
};

export default GridOfDemocrafis;
