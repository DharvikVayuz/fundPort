import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ReactModal } from "../../../../../components/modal";
import { FaPlus } from "react-icons/fa";
import { Input } from "../../../../../components/inputs";
import { Button } from "../../../../../components/buttons/button";
import { Link } from "react-router-dom";
import { label, tr } from "framer-motion/client";
import { ModalWrapper } from "../../../../../components/wrappers/modal";
import { Selector } from "../../../../../components/select";
import { detectCardType } from "../../../../../utils";
import { useDispatch, useSelector } from "react-redux";
// import { addCard } from "../../../../../redux/slices/serviceDetailsSlice";
import { v4 as uuidv4 } from "uuid";
export const DebitCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showAddIcon, setShowAddIcon] = useState(true);

  const [yearOptions, setYearOptions] = useState([]);
  const [activeSavedCard, setActiveSavedCard] = useState(null);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm();

  const handleCardClick = (cardId) => {
    setActiveSavedCard(cardId);

    // Find the card details and populate form fields dynamically
    const selectedCard = cards.find((card) => card.id === cardId);
    console.log(selectedCard, "selectedCard");
    if (selectedCard) {
      setValue("CardNumber", selectedCard.CardNumber || "");
      setValue("Debitcard", selectedCard.CardNumber || "");
      setValue("name", selectedCard.name || "");
      setValue("month", selectedCard.month || "");
      setValue("year", selectedCard.year || "");
      setValue("cvv", ""); // Reset CVV for security
    }
  };

  useEffect(() => {
    const options = [];
    for (let i = 1900; i <= 2099; i++) {
      options.push({ label: i.toString(), value: i.toString() });
    }
    setYearOptions(options);
  }, []);

  const { cards } = useSelector((state) => state.serviceDetails);
  const monthOptions = [
    {
      label: "January",
      value: "January",
    },
    {
      label: "February",
      value: "February",
    },
    {
      label: "March",
      value: "March",
    },
    {
      label: "April",
      value: "April",
    },
    {
      label: "May",
      value: "May",
    },
    {
      label: "June",
      value: "June",
    },
    {
      label: "July",
      value: "July",
    },
    {
      label: "August",
      value: "August",
    },
    {
      label: "September",
      value: "September",
    },
    {
      label: "October",
      value: "October",
    },
    {
      label: "November",
      value: "November",
    },
    {
      label: "December",
      value: "December",
    },
  ];
  const cardNumber = watch("CardNumber");

  // Clear CVV whenever CardNumber changes
  useEffect(() => {
    setValue("cvv", ""); // Clear CVV field
  }, [cardNumber]);
  const onSubmit = (data) => {
    const cardWithId = { ...data, id: uuidv4() }; // Add unique id to the card data
    // dispatch(addCard(cardWithId));
    console.log(data, "card data");
  };
  console.log(cards, "cards");
  return (
    <>
      <p className="font-semibold text-[14px] pb-2 text-[#0A1C40]">
        Debit & Credit card
      </p>
      <div className="flex flex-col gap-6">
        <div className=" flex flex-row justify-between items-center gap-2 ">
          <Controller
            name="Debitcard"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                name={"number"}
                type={"number"}
                label={"Debit Card & Credit Card "}
                placeholder={"Debit Card & Credit Card {}"}
                containerClassName={"w-full"}
                className={"border-[#D9D9D9] border"}
                errorContent={errors?.email?.message}
                onInput={(e) => {
                  const value = e.target.value;
                  // Prevent invalid characters and limit input length to 10
                  e.target.value = value
                    .replace(/[^0-9]/g, "") // Allow only digits
                    .slice(0, 16); // Limit to 10 characters
                  field.onChange(e); // Trigger React Hook Form's onChange
                }}
              />
            )}
          />
          <button onClick={() => setModalOpen(!modalOpen)}>
            <FaPlus
              size={25}
              color="#abaaaa"
              className="bg-[#D9D9D9] px-1 py-1 rounded-full"
            />
          </button>
          {modalOpen && (
            <ModalWrapper
              onClick={() => setModalOpen(false)}
              title={" Enter Card Details"}
              childrenClassName={"overflow-hidden"}
              crossButton={true}
              isOpen={modalOpen}
              onRequestClose={() => setModalOpen(false)}
              button={
                showAddIcon && (
                  <FaPlus
                    size={25}
                    color="#abaaaa"
                    className="bg-[#D9D9D9] px-1 py-1 rounded-full"
                  />
                )
              }
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center items-center gap-20 px-4 py-4"
              >
                <div className="flex justify-start flex-col w-[80%] gap-6 items-start">
                  <div className="items-start flex flex-col">
                    {" "}
                    <p className="font-bold text-black ">
                      Enter a Debit card details
                    </p>
                    <p className="text-[13px] font-medium text-[#717171] ">
                      Provide the Correct card number Details
                    </p>
                  </div>

                  <div className="flex gap-6 w-full items-center">
                    <p className="font-semibold w-[25%] text-start text-sm text-black">
                      {detectCardType(getValues("CardNumber"))} Card number
                    </p>
                    <Controller
                      name="CardNumber"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          {...field}
                          type={"number"}
                          label={"Enter card number "}
                          placeholder={"Enter card number "}
                          containerClassName={"w-full"}
                          className={"border-[#D9D9D9] border"}
                          errorContent={errors?.number?.message}
                          onInput={(e) => {
                            const value = e.target.value;
                            // Prevent invalid characters and limit input length to 10
                            e.target.value = value
                              .replace(/[^0-9]/g, "") // Allow only digits
                              .slice(0, 16); // Limit to 10 characters
                            field.onChange(e); // Trigger React Hook Form's onChange
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="flex gap-6 w-full items-center">
                    <p className="font-semibold w-[25%] text-start text-sm text-black">
                      Holder name{" "}
                    </p>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          {...field}
                          type={"name"}
                          label={"Card holder name  "}
                          placeholder={"Card holder name  "}
                          containerClassName={"w-full"}
                          className={"border-[#D9D9D9] border"}
                          errorContent={errors?.name?.message}
                          maxLength={50}
                        />
                      )}
                    />
                  </div>
                  <div className="flex gap-6 w-full items-center">
                    <p className=" font-semibold w-[20%] text-start text-sm text-black">
                      Expiry date
                    </p>
                    <div className="flex w-[80%] gap-2">
                      <Controller
                        name="month"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Selector
                            {...field}
                            type={"month"}
                            options={monthOptions}
                            label={"MM "}
                            placeholder={"MM  "}
                            containerClassName={"w-full"}
                            className={"border-[#D9D9D9] border"}
                            errorContent={errors?.name?.message}
                          />
                        )}
                      />
                      <Controller
                        name="year"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Selector
                            {...field}
                            options={yearOptions}
                            type={"year"}
                            label={"YYYY "}
                            placeholder={"YYYY "}
                            containerClassName={"w-full"}
                            className={"border-[#D9D9D9] border"}
                            errorContent={errors?.name?.message}
                          />
                        )}
                      />
                      {/* <Controller
                        name="number"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Input
                            {...field}
                            type={"number"}
                            label={"CVV "}
                            placeholder={"CVV "}
                            containerClassName={"w-full"}
                            className={"border-[#D9D9D9] border"}
                            errorContent={errors?.name?.message}
                          />
                        )}
                      /> */}
                      <Controller
                        name="cvv"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            label="CVV"
                            placeholder="CVV"
                            containerClassName="w-full"
                            className="border-[#D9D9D9] border"
                            errorContent={errors?.cvv?.message}
                            maxLength={
                              detectCardType(getValues("CardNumber")) ===
                              "American Express"
                                ? 4
                                : 3
                            } // Dynamically set the maxLength
                            onInput={(e) => {
                              const value = e.target.value;
                              const maxLength =
                                detectCardType(getValues("CardNumber")) ===
                                "American Express"
                                  ? 4
                                  : 3;
                              e.target.value = value
                                .replace(/[^0-9]/g, "")
                                .slice(0, maxLength); // Allow only valid CVV length
                              field.onChange(e);
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <Link>
                    <p className="font-semibold text-black">{"<<"} Back </p>
                  </Link>
                  <Button primary={true}>Save & Next</Button>
                </div>
              </form>
            </ModalWrapper>
          )}
        </div>
        <div className="flex flex-col  gap-6">
          {cards?.map((card) => {
            return (
              <div
                onClick={() => handleCardClick(card?.id)}
                className={`flex rounded justify-between gap-3 border items-start px-2 py-4 cursor-pointer ${
                  activeSavedCard === 1
                    ? "border-[#007AFF] bg-[#f0f8ff]"
                    : "border-[#8080808C]"
                }`}
              >
                <div className="flex items-start gap-2">
                  <input
                    type="radio"
                    name="card"
                    id="card1"
                    checked={activeSavedCard === card.id}
                    readOnly
                  />
                  <div>
                    <p
                      className={`font-semibold text-[11px] ${
                        activeSavedCard === card.id
                          ? "text-[#0A1C40]"
                          : "text-[#8080808C]"
                      }`}
                    >
                      {detectCardType(card.CardNumber)}
                    </p>
                    <p
                      className={`font-semibold text-[13px] ${
                        activeSavedCard === card.id
                          ? "text-[#0A1C40]"
                          : "text-[#8080808C]"
                      }`}
                    >
                      {card.CardNumber}
                    </p>
                  </div>
                </div>
                <p
                  className={`font-medium pr-4 text-[11px] ${
                    activeSavedCard === card.id
                      ? "text-[#0A1C40]"
                      : "text-[#8080808C]"
                  }`}
                >
                  {card.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
