import { Card } from 'antd';

const { Meta } = Card;

const Cards = () => {
  return (
    <>
      <Card
        hoverable
      style={{ width: 560 }}
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
      >
        <Meta title="Europe Street beat" href="https://note.com/izuha0" />
        <a href="https://www.google.com/">Text</a>
      </Card>
    </>
  )
}

export default Cards;
