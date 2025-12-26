import React from 'react'
import Card from './Components/Card'
import Button from './Components/Button';

const App = () => {
  const arr = [
    { name: 'Aman', age: 22 },
    { name: 'Rohit', age: 25 },
    { name: 'Neha', age: 21 },
    { name: 'Priya', age: 24 },
    { name: 'Karan', age: 27 },
    { name: 'Simran', age: 23 },
    { name: 'Arjun', age: 26 },
    { name: 'Pooja', age: 20 },
    { name: 'Vikram', age: 28 },
    { name: 'Anjali', age: 22 }
  ];

  const arr2 = [
  'Download',
  'Upload',
  'Submit',
  'Cancel',
  'Save',
  'Edit',
  'Delete',
  'View',
  'Share',
  'Preview'
];


  return (
    <>
      <div className='flex gap-[1rem] flex-wrap'>
        {arr.map((elem) => {
          return <Card name={elem.name} age={elem.age} />
        })}
      </div>
      <div className='flex ml-[15rem] mt-[4rem]  gap-[2rem]'>
        {arr2.map((elem)=>{
          return <Button text={elem}/>
        })}
        </div>
    </>
  )
}

export default App
