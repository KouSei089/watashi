import { Card } from 'antd';
import { SiZenn } from "react-icons/si";
import { IconContext } from 'react-icons';

const Cards = () => {
  return (
    <>
      <a href="w">
      <Card className="w-44 h-44 mx-24 border-natural relative hover:opacity-50 duration-700">
      <div className="absolute top-0 left-0 animate-ping h-1 w-1 bg-matte rounded-full z-50"></div>
      <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
        <div className="absolute inset-14">
          <SiZenn />
        </div>
      </IconContext.Provider>
      </Card>
      </a>
      <a href="w"><p className="style-ale ml-24 mt-2 pl-1 hover:opacity-50 duration-700 hover:text-black">Card content</p></a>
    </>
  )
}

export default Cards;
