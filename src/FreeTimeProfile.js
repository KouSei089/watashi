import { Carousel } from 'antd';

const contentStyle = {
  height: '200px',
  color: '#36312c',
  lineHeight: '200px',
  textAlign: 'center',
};

const FreeTimeProfile = () => {
  return (
    <Carousel autoplay autoplaySpeed={ 7000 }>
    <div>
      <h3 style={contentStyle} className="font-zen">
        <p>- Book - Negative Capability / Introduction to Flow Theory / Kamakura Capitalism / The Yankee Chatter etc...</p>
      </h3>
    </div>
    <div>
      <h3 style={contentStyle} className="font-zen">
      <p>- Radio - I often listen to Ultra Relativity / Coten Radio / bytes / Off Topic / Sandwichman the Radio Show etc...</p>
      </h3>
    </div>
    <div>
      <h3 style={contentStyle} className="font-zen">
        <p>- Scuba diving - Shizuoka Prefecture / Hachijojima Island / Kashiwazaki City, Niigata Prefecture / Onagawa, Miyagi,Prefecture etc...</p>
      </h3>
    </div>
    <div>
      <h3 style={contentStyle} className="font-zen">
        <p>- Other - Reflection / walking / talking to people / mountain climbing</p>
      </h3>
    </div>
  </Carousel>
  );
}

export default FreeTimeProfile;
