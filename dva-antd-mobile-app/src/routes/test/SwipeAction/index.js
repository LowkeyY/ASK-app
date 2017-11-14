import { SwipeAction, List } from 'antd-mobile';

function handleClick(e) {
  console.log('clicked', e);
}

const SwipeActionExample = () => (
  <List>
    <SwipeAction
      style={{ backgroundColor: 'gray' }}
      autoClose
      right={[
        {
          text: 'Cancel',
          onPress: () => console.log('cancel'),
          style: { backgroundColor: '#ddd', color: 'white' },
        },
        {
          text: 'Delete',
          onPress: () => console.log('delete'),
          style: { backgroundColor: '#F4333C', color: 'white' },
        },
      ]}
      left={[
        {
          text: 'Reply',
          onPress: () => console.log('reply'),
          style: { backgroundColor: '#108ee9', color: 'white' },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('cancel'),
          style: { backgroundColor: '#ddd', color: 'white' },
        },
      ]}
      openLeft = {()=>console.log("openLeft")}
      onOpen={() => console.log('global open')}
      onClose={() => console.log('global close')}
    >
      <List.Item
        extra="More"
        arrow="horizontal"
        onClick={handleClick}
      >
        Have left and right buttons
      </List.Item>
    </SwipeAction>
    <SwipeAction
      style={{ backgroundColor: 'gray' }}
      autoClose
      right={[
        {
          text: 'Cancel',
          onPress: () => console.log('cancel'),
          style: { backgroundColor: '#ddd', color: 'white' },
        },
        {
          text: 'Delete',
          onPress: () => console.log('delete'),
          style: { backgroundColor: '#F4333C', color: 'white' },
        },
      ]}
      left={[
        {
          text: 'Reply',
          onPress: () => console.log('reply'),
          style: { backgroundColor: '#108ee9', color: 'white' },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('cancel'),
          style: { backgroundColor: '#ddd', color: 'white' },
        },
      ]}
      onOpen={() => {
      	const aaa = "";
      	console.log('global open')
      }}
      onClose={() => console.log('global close')}
    >
      <List.Item
        extra="More"
        arrow="horizontal"
        onClick={handleClick}
      >
        Have left and right buttons
      </List.Item>
    </SwipeAction>
  </List>
);

export default SwipeActionExample;