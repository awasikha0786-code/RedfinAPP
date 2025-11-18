import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Swipeable } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import HomeListingCard from '../../../components/common/HomeListingCard/HomeListingCard';
import ConfirmationBottomSheet from '../../../components/common/buttomSheet/ConfirmationBottomSheet';
import { useFavorites } from '../../../context/FavoritesContext';
import { scale, moderateScale } from '../../../utils/layout';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const FavoritesScreen = ({ navigation }) => {
	const { favorites, clearAllFavorites, removeFromFavorites, isFavorite } = useFavorites();
	const [viewMode, setViewMode] = useState('list'); // 'grid' or 'list'
	const [deleteBottomSheetVisible, setDeleteBottomSheetVisible] = useState(false);

	const hasFavorites = favorites.length > 0;

	const handleDeletePress = () => {
		setDeleteBottomSheetVisible(true);
	};

	const handleConfirmDelete = () => {
		clearAllFavorites();
		setDeleteBottomSheetVisible(false);
	};

	const handleRemoveFavorite = (property) => {
		removeFromFavorites(property.id);
	};

	const renderRightAction = (onPress) => (
		<View style={styles.swipeActionContainer}>
			<TouchableOpacity style={styles.swipeActionButton} onPress={onPress} activeOpacity={0.8}>
				<Image 
					source={require('../../../assets/icons/Trash.png')} 
					style={styles.swipeTrashIcon}
					resizeMode="contain"
				/>
			</TouchableOpacity>
		</View>
	);

	const handlePropertyPress = (property) => {
		navigation.getParent()?.navigate('LocationDetail', { property });
	};

	const handleViewToggle = (mode) => {
		setViewMode(mode);
	};

	return (
		<SafeAreaView style={styles.container} edges={['top']}>
			{/* Header */}
			<View style={styles.header}>
				<View style={styles.emptySpace} />
				<Text style={styles.headerTitle}>Saved Homes</Text>
				<TouchableOpacity
					style={styles.iconButton}
					onPress={handleDeletePress}
					activeOpacity={0.8}
				>
					<View style={styles.iconCircle}>
						<Image
							source={require('../../../assets/icons/Trash.png')}
							style={styles.trashIcon}
							resizeMode="contain"
						/>
					</View>
				</TouchableOpacity>
			</View>

			{/* Saved Count and View Toggle */}
			<View style={styles.countSection}>
				<Text style={styles.countText}>
					<Text style={styles.countNumber}>{favorites.length}</Text> homes saved
				</Text>
				<View style={styles.viewToggleContainer}>
					<TouchableOpacity
						style={[
							styles.viewButton,
							styles.viewButtonLeft,
							viewMode === 'grid' && styles.activeViewButton
						]}
						onPress={() => handleViewToggle('grid')}
						activeOpacity={0.7}
					>
						<View style={styles.gridIconContainer}>
							<View style={styles.gridRow}>
								<View style={[styles.gridCell, viewMode === 'grid' && styles.activeGridCell]} />
								<View style={[styles.gridCell, viewMode === 'grid' && styles.activeGridCell]} />
							</View>
							<View style={[styles.gridRow, { marginTop: 2 }]}>
								<View style={[styles.gridCell, viewMode === 'grid' && styles.activeGridCell]} />
								<View style={[styles.gridCell, viewMode === 'grid' && styles.activeGridCell]} />
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.viewButton,
							styles.viewButtonRight,
							viewMode === 'list' && styles.activeViewButton
						]}
						onPress={() => handleViewToggle('list')}
						activeOpacity={0.7}
					>
						<Image
							source={require('../../../assets/icons/Horizontal - Active.png')}
							style={[styles.listIcon, viewMode === 'list' && styles.activeListIcon]}
							resizeMode="contain"
						/>
					</TouchableOpacity>
				</View>
			</View>

			{/* Content */}
			{hasFavorites ? (
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
				>
					{viewMode === 'grid' ? (
						<View style={styles.gridContainer}>
							{favorites.map((property) => (
								<View key={property.id} style={styles.gridCardWrapper}>
									<Swipeable
										renderRightActions={() => renderRightAction(() => handleRemoveFavorite(property))}
										overshootRight={false}
									>
										<TouchableOpacity
											style={styles.gridCard}
											onPress={() => handlePropertyPress(property)}
											activeOpacity={0.9}
										>
											{/* Image Container */}
											<View style={styles.gridImageContainer}>
												<Image
													source={property.image}
													style={styles.gridCardImage}
													resizeMode="cover"
												/>
												{/* Heart Icon - Top Right */}
												<TouchableOpacity
													style={styles.gridHeartButton}
													activeOpacity={0.8}
													onPress={(e) => {
														e.stopPropagation();
														handleRemoveFavorite(property);
													}}
												>
													<View style={styles.gridHeartIconContainer}>
														<Image
															source={require('../../../assets/icons/Heart.png')}
															style={styles.gridHeartIcon}
															resizeMode="contain"
														/>
													</View>
												</TouchableOpacity>
												{/* Price Tag - Bottom Left */}
												<View style={styles.gridPriceTag}>
													<Text style={styles.gridPriceText}>
														$ {property.price?.toLocaleString() || '220'}
													</Text>
												</View>
											</View>
											{/* Content Below Image */}
											<View style={styles.gridContentContainer}>
												<Text style={styles.gridCardTitle}>{property.title}</Text>
												<View style={styles.gridDetailsRow}>
													<Text style={styles.gridStarIcon}>⭐</Text>
													<Text style={styles.gridRatingText}>{property.rating || '4.8'}</Text>
													<Image
														source={require('../../../assets/icons/Location.png')}
														style={styles.gridLocationIcon}
														resizeMode="contain"
													/>
													<Text style={styles.gridLocationText}>{property.location || 'Chicago, IL'}</Text>
												</View>
											</View>
										</TouchableOpacity>
									</Swipeable>
								</View>
							))}
						</View>
					) : (
						<View style={styles.content}>
							{favorites.map((property) => (
								<Swipeable
									key={property.id}
									renderRightActions={() => renderRightAction(() => handleRemoveFavorite(property))}
									overshootRight={false}
								>
									<HomeListingCard
										property={property}
										onPress={() => handlePropertyPress(property)}
										onFavoritePress={handleRemoveFavorite}
										isFavorite={isFavorite(property.id)}
										customStyle={styles.cardWrapper}
									/>
								</Swipeable>
							))}
						</View>
					)}
				</ScrollView>
			) : (
				<View style={styles.emptyStateContainer}>
					<View style={styles.emptyIconContainer}>
						<View style={styles.emptyIconWrapper}>
							<LinearGradient
								colors={['#234F68', '#234F68', '#8BC83F']}
								locations={[0, 0.0469, 0.9831]}
								start={{ x: 0, y: -0.16 }}
								end={{ x: 1.16, y: 1.16 }}
								style={styles.emptyIconBackgroundGlow}
							/>
							<LinearGradient
								colors={['#234F68', '#234F68', '#8BC83F']}
								locations={[0, 0.0469, 0.9831]}
								start={{ x: 0, y: -0.16 }}
								end={{ x: 1.16, y: 1.16 }}
								style={styles.emptyIconCircle}
							>
								<Text style={styles.emptyIconText}>+</Text>
							</LinearGradient>
						</View>
					</View>
					<View style={styles.emptyStateTitleContainer}>
						<Text style={styles.emptyStateTitle}>
							<Text style={styles.emptyStateTitleRegular}>You haven't saved any </Text>
							<Text style={styles.emptyStateTitleBold}>homes</Text>
							<Text style={styles.emptyStateTitleRegular}> yet</Text>
						</Text>
					</View>
					<View style={styles.emptyStateMessageContainer}>
						<Text style={styles.emptyStateMessage}>
							Tap the save icon while browsing to add homes to your favorites.
						</Text>
					</View>
				</View>
			)}

			{/* Delete Confirmation Bottom Sheet */}
			<ConfirmationBottomSheet
				visible={deleteBottomSheetVisible}
				onClose={() => setDeleteBottomSheetVisible(false)}
				onConfirm={handleConfirmDelete}
				title="Are you sure want to"
				highlightText="delete"
				subtitle="all your saved homes?"
				warningText="This action can't be undo"
				cancelText="Cancel"
				confirmText="Delete"
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 16,
	},
	emptySpace: {
		width: 50,
		height: 50,
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: '700',
		color: '#14233A',
	},
	iconButton: {
		zIndex: 1,
	},
	iconCircle: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#F5F4F8',
		justifyContent: 'center',
		alignItems: 'center',
	},
	trashIcon: {
		width: 18,
		height: 18,
		tintColor: '#14233A',
	},
	countSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingBottom: 16,
	},
	countText: {
		fontSize: 14,
		fontWeight: '400',
		color: '#6C7380',
	},
	countNumber: {
		fontWeight: '700',
		color: '#14233A',
	},
	viewToggleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#F5F4F8',
		borderRadius: scale(100),
		width: scale(93),
		height: scale(40),
		opacity: 1,
		padding: scale(8),
		gap: scale(4),
		overflow: 'hidden',
	},
	viewButton: {
		width: scale(36),
		height: scale(24),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
		borderRadius: scale(100),
		opacity: 1,
		paddingTop: scale(6),
		paddingRight: scale(12),
		paddingBottom: scale(6),
		paddingLeft: scale(12),
	},
	viewButtonLeft: {
		borderTopLeftRadius: scale(100),
		borderBottomLeftRadius: scale(100),
	},
	viewButtonRight: {
		borderTopRightRadius: scale(100),
		borderBottomRightRadius: scale(100),
	},
	activeViewButton: {
		backgroundColor: '#FFFFFF',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.15,
		shadowRadius: 4,
		elevation: 4,
	},
	gridIconContainer: {
		width: 16,
		height: 16,
		justifyContent: 'space-between',
	},
	gridRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	gridCell: {
		width: 6,
		height: 6,
		backgroundColor: '#6C7380',
		borderRadius: 1,
		marginRight: 2,
	},
	activeGridCell: {
		backgroundColor: '#21628A',
	},
	listIcon: {
		width: 16,
		height: 16,
		tintColor: '#6C7380',
	},
	activeListIcon: {
		tintColor: '#21628A',
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 24,
	},
	content: {
		paddingHorizontal: 20,
		paddingTop: 16,
		alignItems: 'center',
	},
	cardWrapper: {
		width: 327,
		height: 156,
		borderRadius: 25,
		marginBottom: 16,
	},
	gridContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingTop: 16,
	},
	gridCardWrapper: {
		width: '48%',
		marginBottom: 16,
	},
	gridCard: {
		width: '100%',
		backgroundColor: '#F5F4F8',
		borderRadius: 20,
		overflow: 'hidden',
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	gridImageContainer: {
		width: '100%',
		aspectRatio: 0.89,
		position: 'relative',
		borderRadius: 20,
		overflow: 'hidden',
		marginBottom: 12,
		backgroundColor: '#F3F4F6',
	},
	gridCardImage: {
		width: '100%',
		height: '100%',
	},
	gridHeartButton: {
		position: 'absolute',
		top: 12,
		right: 12,
		zIndex: 10,
	},
	gridHeartIconContainer: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: '#E63946',
		justifyContent: 'center',
		alignItems: 'center',
	},
	gridHeartIcon: {
		width: 18,
		height: 18,
		tintColor: '#ffffff',
	},
	gridPriceTag: {
		position: 'absolute',
		bottom: 12,
		left: 12,
		backgroundColor: 'rgba(33, 98, 138, 0.9)',
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderTopRightRadius: 12,
		borderTopLeftRadius: 8,
		zIndex: 10,
	},
	gridPriceText: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: '700',
		lineHeight: 20,
	},
	gridContentContainer: {
		paddingHorizontal: 12,
		paddingBottom: 12,
	},
	gridCardTitle: {
		fontSize: 16,
		fontWeight: '700',
		color: '#14233A',
		marginBottom: 6,
	},
	gridDetailsRow: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	gridStarIcon: {
		fontSize: 14,
		marginRight: 4,
	},
	gridRatingText: {
		fontSize: 12,
		fontWeight: '600',
		color: '#14233A',
		marginRight: 8,
	},
	gridLocationIcon: {
		width: 12,
		height: 12,
		tintColor: '#6C7380',
		marginRight: 4,
	},
	gridLocationText: {
		fontSize: 12,
		fontWeight: '400',
		color: '#6C7380',
	},
	swipeActionContainer: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'flex-end',
		marginBottom: 16,
	},
	swipeActionButton: {
		width: 72,
		height: '85%',
		backgroundColor: '#1B516B',
		borderTopRightRadius: 12,
		borderBottomRightRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	swipeTrashIcon: {
		width: 18,
		height: 18,
		tintColor: '#FFFFFF',
	},
	emptyStateContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 40,
	},
	emptyIconContainer: {
		alignItems: 'center',
		marginBottom: 32,
	},
	emptyIconWrapper: {
		position: 'relative',
		alignItems: 'center',
		justifyContent: 'center',
	},
	emptyIconBackgroundGlow: {
		position: 'absolute',
		width: scale(142),
		height: scale(142),
		borderRadius: scale(71),
		opacity: 0.1,
		top: scale(-36),
		left: scale(-36),
		shadowColor: '#8BC83F',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.7,
		shadowRadius: 50,
		elevation: 0,
	},
	emptyIconCircle: {
		zIndex: 1,
		width: scale(70),
		height: scale(70),
		borderRadius: scale(35),
		opacity: 1,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#8BC83F',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
	},
	emptyIconText: {
		fontFamily: 'Montserrat',
		fontWeight: '400',
		fontSize: moderateScale(30),
		lineHeight: moderateScale(30),
		letterSpacing: moderateScale(30 * 0.03),
		textAlign: 'center',
		color: '#FFFFFF',
		opacity: 1,
	},
	emptyStateTitleContainer: {
		width: scale(297),
		height: scale(80),
		opacity: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 16,
		alignSelf: 'center',
	},
	emptyStateTitle: {
		fontFamily: 'Lato',
		fontSize: moderateScale(25),
		lineHeight: scale(40),
		letterSpacing: moderateScale(25 * 0.03),
		textAlign: 'center',
		color: '#252B5C',
	},
	emptyStateTitleRegular: {
		fontFamily: 'Lato',
		fontWeight: '500',
		fontSize: moderateScale(25),
		lineHeight: scale(40),
		letterSpacing: moderateScale(25 * 0.03),
		color: '#252B5C',
	},
	emptyStateTitleBold: {
		fontFamily: 'Lato',
		fontWeight: '900',
		fontSize: moderateScale(25),
		lineHeight: scale(40),
		letterSpacing: moderateScale(25 * 0.03),
		color: '#252B5C',
	},
	emptyStateMessageContainer: {
		width: scale(297),
		height: scale(40),
		opacity: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	emptyStateMessage: {
		fontFamily: 'Lato',
		fontWeight: '400',
		fontSize: scale(12),
		lineHeight: scale(20),
		letterSpacing: moderateScale(12 * 0.03),
		textAlign: 'center',
		color: '#53587A',
	},
});

export default FavoritesScreen;

