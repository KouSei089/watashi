import { Card } from 'antd';

const Cards = () => {
  return (
    <>
      <a href="w">
      <Card className="w-44 h-44 mx-24 border-natural relative hover:bg-slate-100">
        <div className="w-12 h-12 absolute inset-y-14 left-16">
        <img alt="example" src="https://user-images.githubusercontent.com/77420123/163105328-f5640076-dd9a-4f35-bd53-f21b3f0c2055.svg"/>
        </div>
      </Card>
      </a>
      <a href="w"><p className="style-ale ml-24 mt-2 pl-1">Card content</p></a>
    </>
  )
}

export default Cards;
