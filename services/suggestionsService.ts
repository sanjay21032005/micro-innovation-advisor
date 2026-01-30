import {
    collection,
    doc,
    getDocs,
    addDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { MicroInnovation } from '../types';

export interface SavedSuggestion {
    id: string;
    userId: string;
    inputText: string;
    suggestions: MicroInnovation[];
    createdAt: Timestamp;
}

/**
 * Save a suggestion session to Firestore
 */
export const saveSuggestion = async (
    userId: string,
    inputText: string,
    suggestions: MicroInnovation[]
): Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, 'suggestions'), {
            userId,
            inputText,
            suggestions,
            createdAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error('Error saving suggestion:', error);
        throw error;
    }
};

/**
 * Get all saved suggestions for a user
 */
export const getUserSuggestions = async (userId: string): Promise<SavedSuggestion[]> => {
    try {
        const q = query(
            collection(db, 'suggestions'),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as SavedSuggestion[];
    } catch (error) {
        console.error('Error getting user suggestions:', error);
        throw error;
    }
};

/**
 * Delete a saved suggestion
 */
export const deleteSuggestion = async (suggestionId: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, 'suggestions', suggestionId));
    } catch (error) {
        console.error('Error deleting suggestion:', error);
        throw error;
    }
};
