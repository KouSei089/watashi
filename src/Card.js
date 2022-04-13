import { Card } from 'antd';

const Cards = () => {
  return (
    <>
      <Card
        style={{
          margin: '96px',
          backgroundColor: '#f7f3ec',
          fontFamily: 'Alegreya Sans SC',
        }}
        cover={
          <img
            alt="example"
            src="https://user-images.githubusercontent.com/77420123/163105328-f5640076-dd9a-4f35-bd53-f21b3f0c2055.svg"
          />
        }
      >
        Dev
      </Card>
    </>
  )
}

export default Cards;
