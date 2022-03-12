// Finder.js 
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Tweet } from 'react-static-tweets'

import { 
  Flex, 
  Input, 
  IconButton, 
  Wrap, 
  WrapItem, 
  Stack, 
  Skeleton, 
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  CloseButton, } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { NumberOfResults } from "../numberOfResults/NumberOfResults";
import { fetchTweets } from "./finderSlice";

export function Finder() {
  // local state to hold to search input value 
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  // retrieve tweets and isLoading from the redux store 
  const { tweets, isLoading, error } = useSelector((state) => state.finder);
 // retrieve numberOfResults from redux store 
  const numberOfResults = useSelector((state) => state.numberOfResults);

  // actual search handler called on button click
  const handleSearch = async () => {
    if (searchValue) {
      setSearchValue("");
      // dispatch the thunk with state values
      dispatch(fetchTweets({ searchValue, numberOfResults }));
    }
  };

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>An Error occurred!</AlertTitle>
        <AlertDescription>
          We couldn't fetch tweets right now. Please try again later.
        </AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );
  }

  return (
    <>
      <Flex alignItems="center">
        <Input
          value={searchValue}
          onChange={(evt) => setSearchValue(evt.target.value)}
          placeholder="enter a theme or hashtag to search"
          size="lg"
          mr={3}
        />
        <IconButton
          colorScheme="blue"
          aria-label="Search Twitter"
          icon={<SearchIcon />}
          onClick={handleSearch}
        />
      </Flex>
      <NumberOfResults />

      {isLoading && (
        <Stack mt={5}>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      )}
      <Wrap mt={5}>
        {/* update from 'data' to 'tweets' */}
        {tweets.map((tweet) => (
          <WrapItem key={tweet.id}>
            <Tweet id={tweet.id} />
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
}