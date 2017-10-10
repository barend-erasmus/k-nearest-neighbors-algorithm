# k-Nearest Neighbors Algorithm

In pattern recognition, the k-nearest neighbors algorithm (k-NN) is a non-parametric method used for classification and regression.

## Classification Example

Here we have a dataset containing a list of drinks with their type, sweetness score and fizziness score.


| Name           | Sweetness | Fizziness | Type          |
| -------------- | --------- | --------- | ------------- |
| Coca-Cola      | 4         | 8         | Soft Drink    |
| Fanta          | 5         | 7         | Soft Drink    |
| Monster Energy | 8         | 9         | Energy Drink  |
| Red Bull       | 7         | 12        | Energy Drink  |
| Alo Drink      | 1         | 2         | Health Drink  |
| KeVita         | 2         | 3         | Health Drink  |
| Vodka          | 2         | 1         | Hard Drink    |
| Rum            | 4         | 1         | Hard Drink    |

Using this dataset we need to classify a new drink(Mountain Dew) which has:

* Sweetness of 6.
* Fizziness of 8.