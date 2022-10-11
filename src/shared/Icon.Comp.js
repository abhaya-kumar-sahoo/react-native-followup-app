import React, {Component} from 'react';

import ArrowBack from 'assets/svg/Icons/ArrowBack.svg';

import {AppColors} from 'assets/AppColors';
import Calender from 'assets/svg/Icons/Calender.svg';
import CalenderBox from 'assets/svg/Icons/CalenderView.svg';
import Chat from 'assets/svg/Icons/ChatIcon.svg';

// APP LOGO LOGO LOGO

export const BackArrowIcon = ({size = 30, color = AppColors.white}) => (
  <ArrowBack
    height={size}
    width={size}
    color={color}
    style={{backgroundColor: AppColors.Transparent}}
  />
);

export const CalenderIcon = ({size = 30, color = AppColors.white}) => (
  <Calender
    height={size}
    width={size}
    color={color}
    style={{backgroundColor: AppColors.Transparent}}
  />
);

export const CalenderView = ({size = 30, color = AppColors.white}) => (
  <CalenderBox
    height={size}
    width={size}
    color={color}
    style={{backgroundColor: AppColors.Transparent}}
  />
);

export const ChatIcon = ({size = 30, color = AppColors.white}) => (
  <Chat
    width={size}
    height={size}
    color={color}
    style={{backgroundColor: AppColors.Transparent}}
  />
);
