import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from './../../hooks'

import { decrement, increment } from './counterSlice'

export function Counter(){
    const count = useAppSelector((state) => state.value)
}