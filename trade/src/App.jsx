import { useState, useEffect } from 'react'
import './App.css'
import './index.css'
import axios from 'axios';
import Timer from './components/Timer';

import { BsFillPersonCheckFill } from 'react-icons/bs';



function App() {
  let timer = null
  useEffect(() => {
    axios.get("http://a0754783.xsph.ru/").then(res => {
      dataProcessing(res)
    })
  }, [])

  useEffect(()=>{},[])

  function dataProcessing(res) {
    setActiveClient(res.data.clients)
    countdownTimer(new Date(res.data.after))

    timer = setInterval(() => {
      let before = new Date()
      let after = new Date(res.data.after)
      if (before >= after) {
        clearInterval(timer)
      } else {
        console.log('t')
        countdownTimer(new Date(res.data.after))
      }
    }, 1000)
  }

  const [count, setCount] = useState(0)

  function countdownTimer(after) {
    let before = new Date()
    const diff = after - before;
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    const hours1 = hours < 10 ? '0' + hours : hours;
    const minutes1 = minutes < 10 ? '0' + minutes : minutes;
    const seconds1 = seconds < 10 ? '0' + seconds : seconds;
    setCount(hours1 + ':' + minutes1 + ':' + seconds1)
  }

  let values = {
    p1: 'Наличие комплекса мероприятий, повышающих стандарты качества изготовления',
    p2: 'Срок изготовления лота, дней',
    p3: 'Гарантийные обязательства, мес',
    p4: "Условия оплаты",
    p5: 'Стоимость изготовления лота, руб (без НДС)'
  }

  let allClients = [
    {
      name: 'ооо "Первый"',
      p1: "-",
      p2: 80,
      p3: 24,
      p4: '30%',
      p5: {
        red: '-25,000',
        green: '2,475,000',
        blue: '3,700,000'
      },
      active: false
    },
    {
      name: 'ооо "Второй"',
      p1: "-",
      p2: 90,
      p3: 24,
      p4: '100%',
      p5: {
        red: '-25,000',
        green: '2,475,000',
        blue: '3,200,000'
      },
      active: true
    },
    {
      name: 'ооо "Третий"',
      p1: "-",
      p2: 75,
      p3: 22,
      p4: '60%',
      p5: {
        red: '-25,000',
        green: '2,475,000',
        blue: '2,800,000'
      },
      active: false
    },
    {
      name: 'ооо "Четвертый"',
      p1: "-",
      p2: 120,
      p3: 36,
      p4: '50%',
      p5: {
        red: '-25,000',
        green: '2,475,000',
        blue: '2,500,000'
      },
      active: false
    }
  ]
  const [activeClient, setActiveClient] = useState({
    client1: false,
    client2: false,
    client3: false,
    client4: false,
  })


  function renderColumns(value) {
    if (value != 'p5') {
      return (
        <>
          <div>{values[value]}</div>
          {allClients.map(client => <div key={client.name}>{client[value]}</div>)}
        </>
      )
    } else {
      return (
        <>
          <div>{values[value]}</div>
          {allClients.map(client => {
            return (
              <div key={client.name} className='grid grid-rows-3'>
                <div className='text-[blue]'>
                  {client[value].blue}
                </div>
                <div className='text-[red]'>
                  {client[value].red}
                </div>
                <div className='text-[green]'>
                  {client[value].green}
                </div>
              </div>
            )
          }
          )}
        </>
      )
    }

  }



  function newMove(id) {
    let obj = {
      client1: false,
      client2: false,
      client3: false,
      client4: false,
    }
    obj[`client${id + 1}`] = true
   
    // axios.post(`http://a0754783.xsph.ru`, { actClients: obj }).then(res=>dataProcessing(res))
  }


  return (
    <div className="App">
      <header className='w-[100%] bg-[white]  shadow-[0_1px_grey] pb-[20px] mb-[20px]'>
        <span className='text-[red] '>
          Ход торгов  <strong>Тестовые торги на аппарат ЛОТОС №2033564 (09.11.2020 07:00)</strong>
        </span>
      </header>

      <span className='text-[red] bg-[#c2c2c2] '>Уважаемые участники, во время вашего хода вы можете изменить параметры торгов, указанных в таблице:</span>



      <div className='grid grid-cols-5  text-[#0d79d2] my-[20px] text-center'>
        <div>Ход</div>
        {Object.values(activeClient).map(client => {
          return client ? <Timer time={count}></Timer> : <div></div>
        })}


      </div>

      <div className='grid grid-cols-5 shadow-[inset_0_-2px_#5e5e5e] text-[#0d79d2] text-center py-[5px]'>
        <div>Параметры и требования</div>
        {Object.values(allClients).map((client, k) => {
          return <div className='grid grid-rows-2' key={k} onClick={() => newMove(k)}>
            <div>Участник {k + 1}</div>
            <div className='relative'>
              <BsFillPersonCheckFill className='absolute text-[green] left-0 top-[50%] translate-y-[-50%]' />
              {client['name']}</div>
          </div>
        })}

      </div>
      <div>
        {Object.keys(values).map((x, k) => {
          return k % 2 != 0 ? <div className='grid grid-cols-5 text-center' key={x}>{renderColumns(x)} </div>
            : <div className='grid grid-cols-5 bg-[#c9c9c9] text-center' key={x}>{renderColumns(x)} </div>
        })}
      </div>

    </div>
  )
}

export default App
