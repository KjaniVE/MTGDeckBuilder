// Mock function for getBasicLands
const getBasicLands = () => [
    { id: 1, name: 'Plains' },
    { id: 2, name: 'Island' },
    { id: 3, name: 'Swamp' },
    { id: 4, name: 'Mountain' },
    { id: 5, name: 'Forest' },
];

// Cards that are already in the randomCards array
const randomCards = [
    { id: 10, name: 'Lightning Bolt' },
    { id: 20, name: 'Counterspell' },
];

// Test cases for getRandomCard validation
describe('Random card validation test', () => {
    test('should add a non-basic land and non-duplicate card', () => {
        const randomCard = { id: 30, name: 'Elvish Mystic' }; // Not basic land, not a duplicate

        if (
            !(
                randomCards.some(card => card.id === randomCard.id) ||
                getBasicLands().some(land => land.id === randomCard.id)
            )
        ) {
            randomCards.push(randomCard);
        }

        expect(randomCards).toContainEqual(randomCard); // Check if card was added
    });

    test('should not add a duplicate card', () => {
        const randomCard = { id: 10, name: 'Lightning Bolt' }; // Duplicate of first card in randomCards

        if (
            !(
                randomCards.some(card => card.id === randomCard.id) ||
                getBasicLands().some(land => land.id === randomCard.id)
            )
        ) {
            randomCards.push(randomCard);
        }

        expect(randomCards).not.toContainEqual({ id: 10, name: 'Lightning Bolt' }); // Should already exist, not added again
        expect(randomCards.length).toBe(3); // Total should still be 2 at this point
    });

    test('should not add a basic land card', () => {
        const randomCard = { id: 1, name: 'Plains' }; // A card from getBasicLands()

        if (
            !(
                randomCards.some(card => card.id === randomCard.id) ||
                getBasicLands().some(land => land.id === randomCard.id)
            )
        ) {
            randomCards.push(randomCard);
        }

        expect(randomCards).not.toContainEqual(randomCard); // Check that basic land was NOT added
    });

    test('should allow valid cards with different IDs and names', () => {
        const randomCard = { id: 40, name: 'Glorious Anthem' }; // Valid card, not basic land, not duplicate

        if (
            !(
                randomCards.some(card => card.id === randomCard.id) ||
                getBasicLands().some(land => land.id === randomCard.id)
            )
        ) {
            randomCards.push(randomCard);
        }

        expect(randomCards).toContainEqual(randomCard); // Check if valid card was added
    });
});