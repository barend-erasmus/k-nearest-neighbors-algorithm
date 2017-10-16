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

![](https://github.com/barend-erasmus/k-nearest-neighbors-algorithm/raw/master/images/chart.png)

Using this dataset we need to classify a new drink (Mountain Dew) which has:

* Sweetness of 6.
* Fizziness of 8.

We start by calculating the distance to the new data point for each existing point which results in the following.

| Name           | Distance | Type          |
| -------------- | -------- | ------------- |
| Fanta          | 1.4142   | Soft Drink    |
| Coca-Cola      | 2        | Soft Drink    |
| Monster Energy | 2.236    | Energy Drink  |
| Red Bull       | 4.123    | Energy Drink  |
| KeVita         | 6.4031   | Health Drink  |
| Rum            | 7.2801   | Hard Drink    |
| Alo Drink      | 7.8102   | Health Drink  |
| Vodka          | 8.0622   | Hard Drink    |


When using the k-NN algorithm we need to specify a k-Factor. This will determine how many of the nearest neighbors are taken into the calculation. In this example, we'll use a k-Factor of 3.

We can now calculate the various probabilities by using only the nearest 3 neighbors.

Soft Drink = number of Soft Drink items / k-Factor = 2 / 3 = 66.66 %

Energy Drink = number of Energy Drink items / k-Factor = 1 / 3 = 33.33 %

This means that there is a high probability that our new drink (Mountain Dew) is a Soft Drink.