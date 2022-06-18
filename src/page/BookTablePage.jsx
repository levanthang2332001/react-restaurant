import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
} from 'date-fns';
import { useState } from 'react';
import { Card, Label, TextInput, Button  } from 'flowbite-react';
import './App.css';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function BookTable() {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
    const URL = 'https://restaurant-json-server.herokuapp.com';


    const handleClick = (e) => {
        setSelectedTime(e.target.prevValue);
    };

    const handleAmount = (e) => {
        setAmount(e.target.value);
    };

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    
    let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
    });

    const  previousMonth = () =>  {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'dd-MM-yyyy'));
    };

    const nextMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'dd-MM-yyyy'));
    };

    const sendData = async () => {
        await axios.post(`${URL}/api/book-table`,{
            name: name,
            email: email,
            time: selectedTime,
            amount: amount,
            day: selectedDay
        }).then(res => console.log(res.data)).catch(err => console.log(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendData();

        setSelectedDay('');
        setAmount('');
        setName('');
        setEmail('');
        toast.success('Booking successfully!');
    };


    return (
    <>
        <ToastContainer draggable={false} transition={Zoom} autoClose={3000} />
        <Card className='mx-40 mt-40'>
            <div className="">
                <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
                    <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
                        <div className="md:pr-14 shadow-2xl px-8 py-4 pr-4">
                            <div className="flex items-center">
                            <h2 className="flex-auto font-semibold text-gray-900">
                                {format(firstDayCurrentMonth, 'MMMM yyyy')}
                            </h2>
                            <button
                                type="button"
                                onClick={previousMonth}
                                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Previous month</span>
                                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                            <button
                                onClick={nextMonth}
                                type="button"
                                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Next month</span>
                                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                            </div>
                            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                            <div>S</div>
                            <div>M</div>
                            <div>T</div>
                            <div>W</div>
                            <div>T</div>
                            <div>F</div>
                            <div>S</div>
                            </div>
                            <div className="grid grid-cols-7 mt-2 text-sm">
                            {days.map((day, dayIdx) => (
                                <div
                                key={day.toString()}
                                className={classNames(
                                    dayIdx === 0 && colStartClasses[getDay(day)],
                                    'py-1.5'
                                )}
                                >
                                <button
                                    type="button"
                                    onClick={() => setSelectedDay(day)}
                                    className={classNames(
                                    isEqual(day, selectedDay) && 'text-white',
                                    !isEqual(day, selectedDay) &&
                                        isToday(day) &&
                                        'text-red-500',
                                    !isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        isSameMonth(day, firstDayCurrentMonth) &&
                                        'text-gray-900',
                                    !isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        !isSameMonth(day, firstDayCurrentMonth) &&
                                        'text-gray-400',
                                    isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                                    isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        'bg-gray-900',
                                    !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                    (isEqual(day, selectedDay) || isToday(day)) &&
                                        'font-semibold',
                                    'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                    )}
                                >
                                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                                    {format(day, 'd')}
                                    </time>
                                </button>
                                </div>
                            ))}
                            </div>
                        </div>
                        <div className='px-4 py-0 mx-0 my-auto'>
                            <div>
                                <Label>Name</Label>
                                <TextInput
                                onChange={handleName}
                                id=""
                                value={name}
                                placeholder="Name"
                                required={true}
                                />
                            </div>
                            <div>
                                <Label>Email</Label>
                                <TextInput
                                onChange={handleEmail}
                                id=""
                                value={email}
                                placeholder="Email"
                                required={true}
                                />
                            </div>
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
                            <select value={amount} onChange={handleAmount} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose a amount</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                            <br/>
                            <TimePickerComponent placeholder='Select a time' value={selectedTime} onChange={handleClick}>
                            </TimePickerComponent>
                            <br/>
                            <Button onClick={handleSubmit} className='mx-auto my-0'>
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    </>
    );
}



let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];
