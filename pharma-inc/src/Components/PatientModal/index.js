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
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { usePatients } from "../../Providers/Patients";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { usePagination } from "../../Providers/Pagination";

const PatientModal = () => {
	const { selectedPatient, setSelectedPatient, patientsList } = usePatients();
	const { isOpen, onClose, onOpen } = useDisclosure();
	const { changePage, currentPage } = usePagination();
	const [isByUrl, setIsByUrl] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const params = useParams();

	const handleCloseModal = () => {
		onClose();
		navigate(`/pages/${params.pageIndex}`);
	};

	//JOGAR ESSAS FUNCOES NO PROVIDER PATIENTS

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

	//JOGAR ESSAS FUNCOES NO PROVIDER PATIENTS

	useEffect(() => {
		const patient = patientsList.find(
			(patient) => patient.login.uuid === params.patientId
		);
		if (patient) {
			setSelectedPatient(patient);
			setIsByUrl(true);
			onOpen();
		}
	}, [params]);

	return (
		<>
			<h1>{params.patientId}</h1>
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
									<Text>{selectedPatient.login.uuid}</Text>
								</Flex>
								<Box position={"relative"}>
									<Text fontWeight="bold" mr="6px">
										URL:
									</Text>
									<CopyToClipboard
										text={window.location.href}
										onCopy={() => alert("Copied")}
									>
										<Button
											position={"absolute"}
											right={0}
											bottom={4}
											bgColor="transparent"
											_hover={{
												bgColor: "transparent",
												color: "orange.500",
											}}
											_focus={{
												outline: "none",
											}}
										>
											<BiCopyAlt />
										</Button>
									</CopyToClipboard>
									<Text
										p={3}
										bgColor="gray.100"
										borderRadius={4}
										mb={4}
									>
										{window.location.href}
									</Text>
								</Box>
							</Stack>
						</ModalBody>
					</ModalContent>
				</Modal>
			)}
		</>
	);
};

export default PatientModal;
