import {
	Avatar,
	Button,
	Box,
	Editable,
	EditableInput,
	EditablePreview,
	Flex,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	Stack,
	useDisclosure,
	ButtonGroup,
	IconButton,
} from "@chakra-ui/react";
import { BiCopyAlt } from "react-icons/bi";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePatients } from "../../Providers/Patients";

const PatientModal = () => {
	const { selectedPatient } = usePatients();
	const { isOpen, onClose, onOpen } = useDisclosure();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		onOpen();
	}, []);

	const handleCloseModal = () => {
		navigate(-1);
		onClose();
	};

	const getBirthday = () => {
		const date = new Date(selectedPatient.dob.date);
		const dateObj = {
			day: date.getDate().toString().padStart(2, "0"),
			month: (date.getMonth() + 1).toString().padStart(2, "0"),
			year: date.getFullYear(),
		};

		const { day, month, year } = dateObj;
		return `${month}/${day}/${year} `;
	};

	const getFullName = () => {
		return selectedPatient.name.first + " " + selectedPatient.name.last;
	};

	return (
		<>
			{selectedPatient && (
				<Modal
					blockScrollOnMount={false}
					isOpen={isOpen}
					onClose={handleCloseModal}
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader mt={-10} textAlign="center">
							<Avatar
								src={selectedPatient.picture.medium}
								size="xl"
								border="6px solid #FFF"
								borderColor="gray.200"
							/>

							<Heading>{getFullName()}</Heading>

							<Flex width={"100%"} justify="center" fontSize={16}>
								<Flex mr={6} w="100%" justify="space-around">
									<Text>
										{selectedPatient.location.country}
									</Text>
								</Flex>
							</Flex>
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Stack>
								<Flex>
									<Text fontWeight="bold" mr="6px">
										Email:{" "}
									</Text>
									<Text>{selectedPatient.email}</Text>
								</Flex>
								<Flex>
									<Text fontWeight="bold" mr="6px">
										Birthday:
									</Text>
									<Text>{getBirthday()}</Text>
								</Flex>
								<Flex>
									<Text fontWeight="bold" mr="6px">
										Gender:
									</Text>
									<Text>{selectedPatient.gender}</Text>
								</Flex>
								<Flex>
									<Text fontWeight="bold" mr="6px">
										Phone:
									</Text>
									<Text>{selectedPatient.phone}</Text>
								</Flex>
								<Flex>
									<Text fontWeight="bold" mr="6px">
										Address:
									</Text>
									<Text>
										{selectedPatient.location.street.name}
									</Text>
								</Flex>
								<Flex>
									<Text fontWeight="bold" mr="6px">
										Id:
									</Text>
									<Text>{selectedPatient.id.value}</Text>
								</Flex>
								<Box position={"relative"}>
									<Button
										position={"absolute"}
										right={0}
										bottom={0}
										p={2}
									>
										<BiCopyAlt />
									</Button>
									<Text fontWeight="bold" mr="6px">
										URL:
									</Text>

									<Editable
										defaultValue={window.location.href}
										p={3}
										bgColor="gray.100"
										borderRadius={4}
									>
										<EditablePreview />
										<EditableInput />
									</Editable>
								</Box>
							</Stack>
						</ModalBody>

						<ModalFooter>
							<Button
								colorScheme="blue"
								mr={3}
								onClick={handleCloseModal}
							>
								Close
							</Button>
							<Button variant="ghost">Secondary Action</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
		</>
	);
};

export default PatientModal;
