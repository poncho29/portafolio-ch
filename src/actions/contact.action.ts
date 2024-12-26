'use server';

interface IParams {
  body: {
    name: string;
    email: string;
    message: string;
  }
}

export const sendContactForm = async ({ body }: IParams) => {
  try {
    const response = await fetch('https://formsubmit.co/ajax/meneses321@hotmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return {
      success: true,
      message: data.message
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: 'An error occurred while submitting the form'
    }
  }
}